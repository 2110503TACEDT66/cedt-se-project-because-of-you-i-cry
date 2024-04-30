"use client";
import React, { useState, useEffect, useRef } from "react";
import { TagJson, Tag, CampgroundJson } from "../../interface";
import getTags from "@/libs/getTags";
import createTagToCampground from "@/libs/createTagToCampground";
import { useSession } from "next-auth/react";
import getCampgrounds from "@/libs/getCampgrounds";
import CampgroundCatalog from "./CampgroundCatalog";
import getTagsForCampground from "@/libs/getTagsForCampgrounds";
import deleteTagFromCampground from "@/libs/deleteTagFromCampground";
import EditTagPopup from "./EditTagPopup";
interface EditTagPopupProps {
  onClose: () => void;
  campgroundId: string;
}

const EditTagPopupEach = ({
  campgroundJson,
}: {
  campgroundJson: Promise<CampgroundJson>;
}) => {
  const [searchTag, setSearchTag] = useState("");
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { data: session } = useSession();
  const [isEnable, setEnable] = useState(false);
  const [campgroundId, setCampgroundId] = useState<string>("");
  const [tagCamp, setTagCamp] = useState<null | Tag[]>();

  const campgrounds = getCampgrounds();
  const isFirstRender = useRef(true);
  const [showEditTagPopup, setShowEditTagPopup] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tagData: TagJson = await getTags();
        if (isEnable || !isFirstRender.current) {
          // Check if not initial render
          const campgroundTag = await getTagsForCampground(campgroundId);
          console.log(campgroundTag.tags);
          setTagCamp(campgroundTag.tags);
          // Populate selectedTags with the tags from tagCamp
          const selectedTagsData: { [key: string]: boolean } = {};
          if (campgroundTag.tags) {
            campgroundTag.tags.forEach((tag: any) => {
              selectedTagsData[tag.name] = true;
            });
          }
          setSelectedTags(selectedTagsData);
        } else {
          setTagCamp(null);
        }
        setAllTags(tagData.tags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    if (isEnable && !isFirstRender.current) {
      // Check if not initial render
      fetchData();
    }
  }, [isEnable]);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);



  const saveTags = async () => {
    // Extract IDs of selected tags
    const selectedTagIDs = Object.keys(selectedTags).filter(
      (tagName) => selectedTags[tagName]
    );

    try {
      // Remove associations for tags that are in tagCamp but not selected
      if (tagCamp && session) {
        for (const tag of tagCamp) {
          if (!selectedTags[tag.name] ) {
            // Remove association from the database
            await deleteTagFromCampground(
              campgroundId,
              session.user.token,
              tag._id
            );
          }
        }
      }

      // Add associations for tags that are selected but not in tagCamp
      for (const tagName of selectedTagIDs) {
        if (!tagCamp || !tagCamp.some((tag) => tag.name === tagName)) {
          // Find the tag object based on its name
          const tagObject = allTags.find((tag) => tag.name === tagName);
          if (tagObject && session) {
            // Add association to the database
            await createTagToCampground(
              campgroundId,
              session.user.token,
              tagObject._id
            );
          }
        }
      }
    } catch (error) {
      console.error("Error saving tags:", error);
      // Handle error if needed
    }

    // Close the popup after handling all tag associations
    setEnable(false);
  };

  useEffect(() => {
    if (searchTag.trim()) {
      const filtered = allTags.filter((tag) =>
        tag.name.toLowerCase().startsWith(searchTag.toLowerCase())
      );
      setFilteredTags(filtered);
    } else {
      setFilteredTags(allTags);
    }
  }, [searchTag, allTags]);

  const handleTagClick = (tagName: string) => {
    setSelectedTags((prevState) => ({
      ...prevState,
      [tagName]: !prevState[tagName],
    }));
  };
  const toggleEditTagPopup = () => {
    setShowEditTagPopup(!showEditTagPopup);
  };
  if (isEnable)
    return (
      <div>
        <div className="z-[100] fixed top-0 left-0 bg-black w-[100vw] h-[100vh] bg-opacity-70">
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6"
            style={{ width: "700px", height: "500px" }}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Edit tags for this campground
              </h2>
              <button
                aria-label="Close popup"
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setEnable(false)}
              >
                ×
              </button>
            </div>

            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 pr-4">
                <input
                  type="text"
                  placeholder="Search tag"
                  value={searchTag}
                  onChange={(e) => setSearchTag(e.target.value)}
                  className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Tag input field"
                />

                <div
                  className="flex flex-wrap overflow-y-auto"
                  style={{ maxHeight: "240px" }}
                >
                  {filteredTags.map((tag) => (
                    <div
                      key={tag.name}
                      className={`m-1 py-1 px-2 rounded-lg cursor-pointer ${
                        selectedTags[tag.name]
                          ? "bg-[#AF9670] text-white"
                          : "bg-[#E1E1E1] text-[#7D7D7D]"
                      }`}
                      onClick={() => handleTagClick(tag.name)}
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={saveTags}
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
                aria-label="Save and close"
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <CampgroundCatalog
          setEnable={setEnable}
          setCampgroundId={setCampgroundId}
          campgroundJson={campgrounds}
          toggleEditTagPopup={toggleEditTagPopup}
        />
      </div>
    );
  else if (showEditTagPopup)
    return (
      <div>
      {showEditTagPopup && (
        <div className="z-[100] fixed top-0 left-0 bg-black w-[100vw] h-[100vh] bg-opacity-70">
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6"
            style={{ width: "700px", height: "500px" }}
            role="dialog"
            aria-modal="true"
          >
            {showEditTagPopup && <EditTagPopup onClose={toggleEditTagPopup} />}
          </div>
        </div>
      )}
      <CampgroundCatalog
        setEnable={setEnable}
        setCampgroundId={setCampgroundId}
        campgroundJson={campgrounds}
        toggleEditTagPopup={toggleEditTagPopup}
      />
    </div>
    );
  else
    return (
      <div>
        <CampgroundCatalog
          setEnable={setEnable}
          setCampgroundId={setCampgroundId}
          campgroundJson={campgrounds}
          toggleEditTagPopup={toggleEditTagPopup}
        />
      </div>
    );
};

export default EditTagPopupEach;
