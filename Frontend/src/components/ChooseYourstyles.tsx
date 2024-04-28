"use server";
import ImageSlider from "./ImageSlider";
import styles from "./chooseYourStyles.module.css";

import Image from "next/image";

export default async function ChooseYourStyles() {
  const backendurl = process.env.BACKEND_URL;
  const allcampgroundData = await (
    await fetch(
      `${backendurl}/api-informations/campgrounds?sort=-rating&limit=5`
    )
  ).json();

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
        <div
          className={`m-1 py-3 px-6 rounded-lg cursor-pointer bg-[#AF9670] text-white wrap`}
        >
          tag
        </div>
        <div
          className={`m-1 py-3 px-6 rounded-lg cursor-pointer bg-[#AF9670] text-white wrap`}
        >
          tag2
        </div>
        <div
          className={`m-1 py-3 px-6 rounded-lg cursor-pointer bg-[#AF9670] text-white wrap`}
        >
          tag3
        </div>
        <div
          className={`m-1 py-3 px-6 rounded-lg cursor-pointer bg-[#AF9670] text-white wrap`}
        >
          tag4
        </div>
      </div>
      <ImageSlider campgroundArray={allcampgroundData.data} />
    </div>
  );
}
