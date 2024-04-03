import styles from "./cardBanner.module.css";
import Image from "next/image";
import InteractiveCardBanner from "./InteractiveCardBanner";
import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

export default function CardBanner({
  campgroundName,
  imgSrc,
  onRating,
}: {
  campgroundName: string;
  imgSrc: string;
  onRating?: Function;
}) {
  return (
    <InteractiveCardBanner contentName={campgroundName}>
      <div className="w-full h-[75%] relative rounded-t-lg">
        <Image
          src={imgSrc}
          alt="Product Picture"
          fill={true}
          className="object-cover "
        />
      </div>
      <div className="bg-orange-600 rounded-b-[20px] text-white text-center w-full h-[25%] p-[20px]">
        {campgroundName}
      </div>
      {/* <br/>
            {
                onRating?<Rating id={campgroundName+" Rating"} name={campgroundName+" Rating"} data-testid={campgroundName+" Rating"}
                defaultValue={5} onChange={(e, value) => { e.stopPropagation(); onRating(campgroundName, value)}} /> : ''
            } */}
    </InteractiveCardBanner>
  );
}
