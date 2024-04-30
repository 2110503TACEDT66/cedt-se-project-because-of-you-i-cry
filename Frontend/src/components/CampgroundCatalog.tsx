import React, { useState, useEffect } from "react";
import Link from "next/link";
import Card from "./Card";
import { CampgroundJson } from "../../interface";
import { TextField, Rating } from "@mui/material";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import getTags from "@/libs/getTags";
import { TagJson } from "../../interface";
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import { useSession } from "next-auth/react";
import { Session } from "inspector";
import getUserProfile from "@/libs/getUserProfile";
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

export default function CampgroundCatalog({
  campgroundJson,
  setEnable,
  setCampgroundId,
  toggleEditTagPopup,
}: {
  campgroundJson: Promise<CampgroundJson>;
  setEnable: any;
  setCampgroundId: any;
  toggleEditTagPopup: any;
}) {
  const [role, setRole] = useState<string>("user");
  const [valueMax, setMaxValue] = useState<number | null>(null);
  const [valueMin, setMinValue] = useState<number | null>(null);
  const [selectedStars, setSelectedStars] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [tagsData, setTagsData] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<{ [key: string]: boolean }>(
    {}
  );
  const session = useSession();

  const handleStarChange = (value: number) => {
    setSelectedStars(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleProvinceChange = (newValue: string) => {
    setSelectedProvince(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session && session.data && session.data.user) {
          const profile = await getUserProfile(session.data.user.token);
          setRole(profile.data.role);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [session.data?.user]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const provinceParam = urlParams.get("province");
    const formattedProvince = provinceParam
      ? provinceParam.split(/(?=[A-Z])/).join(" ")
      : "";
    setSelectedProvince(formattedProvince);
  }, []);

  useEffect(() => {
    getTags()
      .then((data: TagJson) => {
        const tagNames = data.tags.map((tag) => tag.name);
        setTagsData(tagNames);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
      });
  }, []);
  return (
    <>
      <div className=" mt-14">
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="border-2 border-[#285F3E] rounded-xl p-1 w-[76.5%] mr-8"
            placeholder="Search name of campground"
          />
        </div>
      </div>
      <FilterPanel
        handleStarChange={handleStarChange}
        selectedStars={selectedStars}
        setMinValue={setMinValue}
        setMaxValue={setMaxValue}
        valueMin={valueMin}
        valueMax={valueMax}
        selectedProvince={selectedProvince}
        handleProvinceChange={handleProvinceChange}
        tagsData={tagsData}
        selectedTags={selectedTags}
        handleTagClick={(tagName: string) =>
          setSelectedTags((prevState) => ({
            ...prevState,
            [tagName]: !prevState[tagName],
          }))
        }
        toggleEditTagPopup={toggleEditTagPopup}
        role={role}
      >
        <Suspense
          fallback={
            <div className="justify-center">
              <React.Fragment>
                <svg width={0} height={0}>
                  <defs>
                    <linearGradient
                      id="my_gradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#e01cd5" />
                      <stop offset="100%" stopColor="#1CB5E0" />
                    </linearGradient>
                  </defs>
                </svg>
                <CircularProgress
                  sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
                />
              </React.Fragment>
            </div>
          }
        >
          <ListCampground
            campgroundJson={campgroundJson}
            selectedStars={selectedStars}
            valueMin={valueMin}
            valueMax={valueMax}
            searchQuery={searchQuery}
            selectedProvince={selectedProvince}
            selectedTags={selectedTags}
            setEnable={setEnable}
            setCampgroundId={setCampgroundId}
            role={role}
          />
        </Suspense>
      </FilterPanel>
    </>
  );
}

async function ListCampground({
  campgroundJson,
  selectedStars,
  valueMin,
  valueMax,
  searchQuery,
  selectedProvince,
  selectedTags,
  setEnable,
  setCampgroundId,
  role,
}: {
  campgroundJson: Promise<CampgroundJson>;
  selectedStars: number;
  valueMin: number | null;
  valueMax: number | null;
  searchQuery: string;
  selectedProvince: string;
  selectedTags: { [key: string]: boolean };
  setEnable: any;
  setCampgroundId: any;
  role: string;
}) {
  const campgroundReady = await campgroundJson;

  const filteredData = campgroundReady.data.filter((item) => {
    const passedStarFilter =
      selectedStars === 0 || item.rating >= selectedStars;
    const passedPriceFilter =
      (valueMin === null || item.price >= valueMin) &&
      (valueMax === null || item.price <= valueMax);
    const passedSearchQuery =
      searchQuery.trim() === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const passedProvinceFilter =
      selectedProvince === "" || item.province === selectedProvince;
    const anyTagSelected = Object.values(selectedTags).some(
      (isSelected) => isSelected
    );

    const passedTagFilter =
      !anyTagSelected || item.tagsName.some((tag) => selectedTags[tag]);

    return (
      passedStarFilter &&
      passedPriceFilter &&
      passedSearchQuery &&
      passedProvinceFilter &&
      passedTagFilter
    );
  });

  const showBorder = filteredData.length > 0;

  return (
    <div
      className={`border ${
        showBorder ? "border-black" : "border-transparent"
      } rounded-lg px-3 pr-7 pt-2 pb-4`}
      style={{ maxHeight: "90vh", overflowY: "auto", overflowX: "hidden" }}
    >
      {filteredData.map((campgroundItem) => (
        <Link
          href={`/campground/${campgroundItem.id}`}
          className="w-[100%] "
          key={campgroundItem.id}
        >
          <Card
            campgroundName={campgroundItem.name}
            imgSrc={campgroundItem.coverpicture}
            price={campgroundItem.price}
            province={campgroundItem.province}
            rating={campgroundItem.rating}
            campgroundTags={campgroundItem.tagsName}
            campgroundId={campgroundItem.id}
            setEnable={setEnable}
            setCampgroundId={setCampgroundId}
            role={role}
          />
        </Link>
      ))}
    </div>
  );
}

function FilterPanel({
  children,
  handleStarChange,
  selectedStars,
  setMinValue,
  setMaxValue,
  valueMin,
  valueMax,
  selectedProvince,
  handleProvinceChange,
  tagsData,
  selectedTags,
  handleTagClick,
  toggleEditTagPopup,
  role,
}: {
  children: React.ReactNode;
  handleStarChange: (value: number) => void;
  selectedStars: number;
  setMinValue: (value: number | null) => void;
  setMaxValue: (value: number | null) => void;
  valueMin: number | null;
  valueMax: number | null;
  selectedProvince: string;
  handleProvinceChange: (newValue: string) => void;
  tagsData: string[];
  selectedTags: { [key: string]: boolean };
  handleTagClick: (tagName: string) => void;
  toggleEditTagPopup: any;
  role: string;
}) {
  const [searchInput, setSearchInput] = useState<string>("");
  const session = useSession();
  const filteredTags = tagsData.filter((tag) =>
    tag.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <div className="w-[95%] m-5 p-5 flex flex-row flex-wrap space-x-10 justify-center items-start ">
        <div className="w-[20%] relative items-start">
          <div className="bg-[#F5F5F5] w-full my-auto block border border-black rounded-lg overflow-hidden h-[90vh]">
            <div className="w-[100%] block items-center">
              <div className="p-8">
                <Autocomplete
                  value={selectedProvince}
                  onChange={(event, newValue) =>
                    handleProvinceChange(newValue || "")
                  }
                  sx={{ backgroundColor: "white" }}
                  options={[
                    "Chiang Rai",
                    "Chiang Mai",
                    "Lamphun",
                    "Lampang",
                    "Uttaradit",
                    "Phrae",
                    "Nan",
                    "Phayao",
                    "Mae Hong Son",
                    "Sukhothai",
                    "Phitsanulok",
                    "Phetchabun",
                    "Tak",
                    "Kamphaeng Phet",
                    "Phichit",
                    "Udon Thani",
                    "Nong Khai",
                    "Nong Bua Lamphu",
                    "Loei",
                    "Sakon Nakhon",
                    "Nakhon Phanom",
                    "Mukdahan",
                    "Bueng Kan",
                    "Khon Kaen",
                    "Ubon Ratchathani",
                    "Si Sa Ket",
                    "Roi Et",
                    "Maha Sarakham",
                    "Kalasin",
                    "Yasothon",
                    "Amnat Charoen",
                    "Nakhon Ratchasima",
                    "Buriram",
                    "Surin",
                    "Chaiyaphum",
                    "Bangkok",
                    "Nakhon Pathom",
                    "Samut Prakan",
                    "Samut Sakhon",
                    "Samut Songkhram",
                    "Ratchaburi",
                    "Kanchanaburi",
                    "Suphan Buri",
                    "Chai Nat",
                    "Lopburi",
                    "Sing Buri",
                    "Ang Thong",
                    "Saraburi",
                    "Ayutthaya",
                    "Nakorn Sawan",
                    "Nonthaburi",
                    "Chonburi",
                    "Rayong",
                    "Chanthaburi",
                    "Trat",
                    "Sa Kaeo",
                    "Prachinburi",
                    "Chachoengsao",
                    "Nakhon Nayok",
                    "Kanchanaburi",
                    "Ratchaburi",
                    "Phetchaburi",
                    "Prachuap Khiri Khan",
                    "Chumphon",
                    "Ranong",
                    "Surat Thani",
                    "Nakhon Si Thammarat",
                    "Phatthalung",
                    "Songkhla",
                    "Satun",
                    "Yala",
                    "Pattani",
                    "Narathiwat",
                    "Krabi",
                    "Phang Nga",
                    "Phuket",
                    "Trang",
                  ]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Province"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </div>
              <div className="flex items-center justify-center mx-2 ">
                <div className="bg-[#909090] w-[80%] h-px"></div>
              </div>
              <div className="p-8 ">
                <div className="text-base  text-left font-inter">Stars</div>
                <div className="text-left mt-2">
                  <Rating
                    value={selectedStars}
                    onChange={(event, newValue) => {
                      handleStarChange(newValue || 0);
                    }}
                    size="large"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center mx-2">
                <div className="bg-[#909090] w-[80%] h-px"></div>
              </div>
              <div className="p-8 ">
                <div>
                  <div className="text-base font-inter pb-5 text-left">
                    Prices Range (per night)
                  </div>
                </div>
                <div className="flex flex-row justify-start">
                  <div className="mt-2 ">
                    <TextField
                      value={valueMin || ""}
                      label="Min"
                      type="string"
                      size="small"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                        style: {
                          position: "absolute",
                          top: "-7px",
                        },
                      }}
                      inputProps={{
                        style: {
                          paddingLeft: "10px",
                          backgroundColor: "white",
                        },
                      }}
                      style={{ width: "100px" }} // Adjust the width as needed
                      onChange={(e) => {
                        setMinValue(parseInt(e.target.value) || null);
                      }}
                    />
                  </div>
                  <div className="m-2">_</div>
                  <div className="m-2 ">
                    <TextField
                      value={valueMax || ""}
                      label="Max"
                      type="string"
                      size="small"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                        style: { position: "absolute", top: "-7px" },
                      }}
                      inputProps={{
                        style: {
                          paddingLeft: "10px",
                          backgroundColor: "white",
                        },
                      }}
                      style={{ width: "100px" }} // Adjust the width as needed
                      onChange={(e) => {
                        setMaxValue(parseInt(e.target.value) || null);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mx-2 ">
              <div className="bg-[#909090] w-[80%] h-px"></div>
            </div>

            <div className="p-8 h-[40%] w-[100%]">
              <div className="flex flex-row w-[100%] pr-[5%] h-[20%] items-center text-center justify-between">
                <div className="w-[20%] text-base font-inter text-left flex items-center justify-center">
                  Tags
                </div>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-[70%] border-2 rounded-[5px] mr-3"
                  placeholder="Search Tag"
                />
              </div>
              <div className="h-[70%] w-[100%] overflow-auto">
                <div className="flex flex-col  h-[20%] ">
                  <div className="flex flex-wrap justify-start mt-2">
                    {filteredTags.map((tagName) => (
                      <div
                        key={tagName}
                        className={`m-1 py-1 px-2 rounded-lg cursor-pointer ${
                          selectedTags[tagName]
                            ? "bg-[#AF9670] text-white"
                            : "bg-[#E1E1E1] text-[#7D7D7D]"
                        }`}
                        onClick={() => handleTagClick(tagName)} // Pass tagName to the click handler
                      >
                        {tagName}
                      </div>
                    ))}
                    {role === "admin" ? (
                      <img
                        src="/img/pencil.png"
                        alt="Edit tags"
                        className="w-8 h-8 ml-2 mt-1 cursor-pointer"
                        onClick={toggleEditTagPopup}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[60%] relative items-center">{children}</div>
      </div>
    </>
  );
}
