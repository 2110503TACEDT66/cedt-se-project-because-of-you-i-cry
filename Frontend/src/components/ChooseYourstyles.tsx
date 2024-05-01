"use client";
import ImageSlider from "./ImageSlider";
import styles from "@/components/ChooseYourstyles.module.css";
import { useState, useEffect } from "react";
import getCampgrounds from "@/libs/getCampgrounds";
import { CampgroundItem, CampgroundJson } from "../../interface";

import Image from "next/image";
import ImageSliderSwiper from "./ImageSliderSwiper";

export default function ChooseYourStyles() {
  const [allCampgrounds, setAllCampgrounds] = useState<null | CampgroundJson>();
  const [filteredCampgrounds, setFilteredCampgrounds] = useState<
    null | CampgroundItem[]
  >();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchAllCampgrounds = async () => {
      try {
        const response = await getCampgrounds();
        setAllCampgrounds(response);
        setFilteredCampgrounds(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllCampgrounds();
  }, []);

  const handleTagClick = (tag: string) => {
    const isSelected = selectedTags.includes(tag);
    const updatedSelectedTags = isSelected
      ? selectedTags.filter((selectedTag) => selectedTag !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updatedSelectedTags);

    if (allCampgrounds && updatedSelectedTags.length === 0) {
      setFilteredCampgrounds(allCampgrounds?.data);
    } else {
      const filtered = allCampgrounds?.data.filter(
        (campground: any) =>
          campground.tagsName &&
          updatedSelectedTags.some((selectedTag) =>
            campground.tagsName.includes(selectedTag)
          )
      );
      console.log(filtered);
      filtered?.sort((a: CampgroundItem, b: CampgroundItem) => {
        if (a.rating < b.rating) return -1;
        if (a.rating > b.rating) return 1;
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      setFilteredCampgrounds(filtered);
    }
  };
  return (
    <div className={styles.TrendingSectionWrapper}>
      <div className={styles.HeaderLine}>
        <div className={styles.line}></div>
        <div className={styles.HeaderTextWrapper}>Choose Your Styles</div>
        <div className={styles.line}>
          <h2 className={styles.FloatingText}>
            Pick a vibe and explore the top destinations in Thailand!
          </h2>
        </div>
      </div>
      <div className="flex flex-row items-center justfy-start w-[80%] mb-3">
        <button
          key="Lakeside"
          className={`m-1 py-3 px-4 rounded-xl cursor-pointer wrap border border-[#F7ADEB]
                    ${
                      selectedTags.includes("Lakeside")
                        ? "bg-[#F7ADEB] text-white"
                        : "bg-[#F7ADEB1A] text-[#F7ADEB]"
                    }`}
          onClick={() => handleTagClick("Lakeside")}
        >
          Lakeside
        </button>
        <button
          key="Riverside"
          className={`m-1 py-3 px-4 rounded-xl cursor-pointer wrap border border-[#F7D1AD]
                    ${
                      selectedTags.includes("Riverside")
                        ? "bg-[#F7D1AD] text-white"
                        : "bg-[#F7D1AD1A] text-[#F7D1AD]"
                    }`}
          onClick={() => handleTagClick("Riverside")}
        >
          Riverside
        </button>
        <button
          key="Canyon Camp"
          className={`m-1 py-3 px-4 rounded-xl cursor-pointer wrap border border-[#A1A5FF]
                    ${
                      selectedTags.includes("Canyon Camp")
                        ? "bg-[#A1A5FF] text-white"
                        : "bg-[#A1A5FF1A] text-[#A1A5FF]"
                    }`}
          onClick={() => handleTagClick("Canyon Camp")}
        >
          Canyon Camp
        </button>
        <button
          key="Valley View"
          className={`m-1 py-3 px-4 rounded-xl cursor-pointer wrap border border-[#9C6109]
                      ${
                        selectedTags.includes("Valley View")
                          ? "bg-[#9C6109] text-white"
                          : "bg-[#9C61091A] text-[#9C6109]"
                      }`}
          onClick={() => handleTagClick("Valley View")}
        >
          Valley View
        </button>
      </div>
      <ImageSliderSwiper campgroundArray={filteredCampgrounds} />
    </div>
  );
}
