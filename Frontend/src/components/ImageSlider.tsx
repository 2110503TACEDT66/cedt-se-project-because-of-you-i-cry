"use client";

import styles from "./imageslide.module.css";
import SliderCard from "./SliderCard";

export default function ImageSlider({ campgroundArray }: { campgroundArray?: any }) {
  // ตรวจสอบและกำหนดค่าเริ่มต้นให้ campgroundArray เป็นอะเรย์ว่าง หากมีค่าเป็น undefined
  const campgroundArrayData = campgroundArray ?? [];

  // ตัด campgroundArray ให้มีความยาวเพียง 3 รายการ
  const slicedCampgroundArray = campgroundArrayData.slice(0, 3);

  // สร้างอะเรย์ใหม่ที่ประกอบด้วยทั้ง campground จริงและ card ว่างจนครบ 3 รายการ
  const combinedArray = [...slicedCampgroundArray];
  const emptyCard = { name: "none" };

  while (combinedArray.length < 3) {
    combinedArray.push(emptyCard);
  }

  return (
    <div className="mt-[5%] px-[7%] w-[100%] flex flex-row items-center justify-between">
      {combinedArray.map((campground: any, index: number) => (
        <div key={index} className="flex items-center justify-center">
          {campground.name === "none" ? (
            <div
              className="h-[296px] w-[342px] overflow-hidden rounded-[15px] relative cursor-pointer bg-[#D9D9D9]
                            flex flex-row justify-center items-center wrap"
            >
              <div className="w-[80%] wrap text-center">
                "There are no more campgrounds related to this filter"
              </div>
            </div>
          ) : (
            <SliderCard data={campground} />
          )}
        </div>
      ))}
    </div>
  );
}