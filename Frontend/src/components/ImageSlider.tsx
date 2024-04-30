"use client";

import styles from "./imageslide.module.css";

import SliderCard from "./SliderCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Mousewheel, Keyboard } from "swiper/modules";

import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/navigation";

export default function ImageSlider({
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

    <div data-test="ImageSlider" className={"mt-[5%] px-[7%] w-[100%] flex flex-row items-center " + (campgroundArray.length == 1 ? "justify-center" : campgroundArray.length == 2 ? "justify-around" :  "justify-between")}>
        {campgroundArraySlice.map((campground : any) => (
          <SliderCard data={campground}/>
        ))}
    </div>
  );
}
