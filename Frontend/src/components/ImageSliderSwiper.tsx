"use client";

import styles from "./imageslide.module.css";

import SliderCard from "./SliderCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Mousewheel, Keyboard } from "swiper/modules";

import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/navigation";

export default function ImageSliderSwiper({
  campgroundArray,
}: {
  campgroundArray: any;
}) {
  const style: any = {
    "--swiper-navigation-color": "#000000",
  };

  const mocknone = {
    name: "none",
  };

  
  if (!Array.isArray(campgroundArray)) {
    campgroundArray = [];
  }

  const campgroundArraySlice = campgroundArray.slice(0 , 3)
  console.log(campgroundArraySlice)
  return (
    <div className="mt-[2%] w-[90%]">
      <Swiper
          style={style}
          slidesPerView={3}
          spaceBetween={0}
          navigation={true}
          modules={[Pagination, Navigation]}
          loop={true}
          className="mySwiper"
        >
          {campgroundArray.map((campground: any, index: number) => (
            <SwiperSlide key={index}>
              {campground.name === "none" ? (
                <div className="flex items-center justify-center">
                  <div
                    className="h-[296px] w-[342px] overflow-hidden rounded-[15px] relative cursor-pointer bg-[#D9D9D9]
                                  flex flex-row justify-center items-center wrap"
                  >
                    <div className="w-[80%] wrap text-center">
                      "There are no more campgrounds related to this filter"
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <SliderCard data={campground} />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
  );
}
