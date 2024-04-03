"use client";
import Link from "next/link";
import Card from "./Card";
import { CampgroundJson } from "../../interface";
import {
  TextField,
  Rating,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { Children, useState } from "react";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function CampgroundCatalog({
  campgroundJson,
}: {
  campgroundJson: Promise<CampgroundJson>;
}) {
  const [valueMax, setMaxValue] = useState<number | null>(null);
  const [valueMin, setMinValue] = useState<number | null>(null);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [cityFilter, setCityFilter] = useState<string>("");

  const handleStarChange = (value: number) => {
    if (selectedStars.includes(value)) {
      setSelectedStars(selectedStars.filter((star) => star !== value));
    } else {
      setSelectedStars([...selectedStars, value]);
    }
  };

  return (
    <>
      <FilterPanel
        handleStarChange={handleStarChange}
        selectedStars={selectedStars}
        setMinValue={setMinValue}
        setMaxValue={setMaxValue}
        valueMin={valueMin}
        valueMax={valueMax}
        cityFilter={cityFilter}
        setCityFilter={setCityFilter}
      >
        <Suspense
          fallback={
            <p className="m-10">
              <p className="text-xl mb-5">Loading ...</p>
              <LinearProgress />
            </p>
          }
        >
          <ListCampground
            campgroundJson={campgroundJson}
            selectedStars={selectedStars}
            valueMin={valueMin}
            valueMax={valueMax}
            cityFilter={cityFilter}
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
  cityFilter,
}: {
  campgroundJson: Promise<CampgroundJson>;
  selectedStars: number[];
  valueMin: number | null;
  valueMax: number | null;
  cityFilter: string;
}) {
  const campgroundReady = await campgroundJson;

  const filteredData = campgroundReady.data.filter((item) => {
    const passedStarFilter =
      selectedStars.length === 0 || selectedStars.includes(item.rating);
    const passedPriceFilter =
      (valueMin === null || item.price >= valueMin) &&
      (valueMax === null || item.price <= valueMax);
    const passedCityFilter =
      cityFilter === "" ||
      item.province.toLowerCase().includes(cityFilter.toLowerCase());
    return passedStarFilter && passedPriceFilter && passedCityFilter;
  });

  return (
    <>
      {filteredData.map((campgroundItem) => (
        <Link
          href={`/campground/${campgroundItem.id}`}
          className="w-[95%]"
          key={campgroundItem.id}
        >
          <Card
            campgroundName={campgroundItem.name}
            imgSrc={campgroundItem.coverpicture}
            price={campgroundItem.price}
            province={campgroundItem.province}
          />
        </Link>
      ))}
    </>
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
  setCityFilter,
  cityFilter,
}: {
  children: React.ReactNode;
  handleStarChange: (value: number) => void;
  selectedStars: number[];
  setMinValue: (value: number | null) => void;
  setMaxValue: (value: number | null) => void;
  valueMin: number | null;
  valueMax: number | null;
  setCityFilter: (value: string) => void;
  cityFilter: string;
}) {
  return (
    <>
      <div className="w[95%] m-5 p-5 flex flex-row flex-wrap space-x-10 justify-center items-start">
        <div className="w-[25%] relative items-start">
          <div className="bg-white w-full my-auto block border border-black rounded-lg">
            <div className="w-[100%] block items-center">
              <div className="p-8 border-b border-black">
                <div className="text-lg text-left">Stars</div>
                <div>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedStars.includes(1)}
                          onChange={(e) =>
                            handleStarChange(parseInt(e.target.value))
                          }
                          value={1}
                          size="small"
                        />
                      }
                      label={<Rating value={1} max={1} readOnly />}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedStars.includes(2)}
                          onChange={(e) =>
                            handleStarChange(parseInt(e.target.value))
                          }
                          value={2}
                          size="small"
                        />
                      }
                      label={<Rating value={2} max={2} readOnly />}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedStars.includes(3)}
                          onChange={(e) =>
                            handleStarChange(parseInt(e.target.value))
                          }
                          value={3}
                          size="small"
                        />
                      }
                      label={<Rating value={3} max={3} readOnly />}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedStars.includes(4)}
                          onChange={(e) =>
                            handleStarChange(parseInt(e.target.value))
                          }
                          value={4}
                          size="small"
                        />
                      }
                      label={<Rating value={4} max={4} readOnly />}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedStars.includes(5)}
                          onChange={(e) =>
                            handleStarChange(parseInt(e.target.value))
                          }
                          value={5}
                          size="small"
                        />
                      }
                      label={<Rating value={5} max={5} readOnly />}
                    />
                  </FormGroup>
                </div>
              </div>
              <div className="p-8 border-b border-black">
                <div>
                  <div className="text-lg">Prices Range (per night)</div>
                </div>
                <div className="flex flex-row">
                  <div className="m-2 ">
                    <TextField
                      value={valueMin || ""}
                      label={"min"}
                      type="number"
                      size="small"
                      variant="outlined"
                      onChange={(e) => {
                        setMinValue(parseInt(e.target.value) || null);
                      }}
                    />
                  </div>
                  <div className="m-2">-</div>
                  <div className="m-2 ">
                    <TextField
                      value={valueMax || ""}
                      label={"max"}
                      type="number"
                      size="small"
                      variant="outlined"
                      onChange={(e) => {
                        setMaxValue(parseInt(e.target.value) || null);
                      }}
                    />
                  </div>
                </div>
                <div></div>
              </div>
              <div className="p-8 space-y-2">
                <div className="text-lg text-left">City</div>

                <div className="items-left text-left">
                  <TextField
                    value={cityFilter}
                    label={"Name of City"}
                    helperText="Ex. Chiangmai, Bangkok"
                    onChange={(e) => setCityFilter(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[70%] relative items-center">{children}</div>
      </div>
    </>
  );
}
