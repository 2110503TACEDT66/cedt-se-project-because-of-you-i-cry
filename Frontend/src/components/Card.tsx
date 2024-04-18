import styles from "./card.module.css";
import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import { Rating } from "@mui/material";

export default function Card({
  campgroundName,
  imgSrc,
  price,
  province,
  rating,
}: {
  campgroundName: string;
  imgSrc: string;
  price: number;
  province: string;
  rating: number;
}) {
  return (
    <InteractiveCard>
      <div className="w-full h-full relative rounded-lg flex flex-row shadow-md bg-[#F5F5F5]">
        <div className="w-[35%] h-[90%] rounded-lg p-3 mx-3 my-auto flex items-center justify-center relative">
          <Image
            src={imgSrc}
            alt="reduce risk"
            layout="fill"
            objectFit="fill"
            className="rounded-lg relative"
          />
        </div>

        <div className="w-[65%] h-full text-left p-2 my-auto">
          <div className="text-lg text-wrap font-inter pt-2">{campgroundName}</div>
          <div className="text-lg items-center flex">
            <Rating
              name="campground rating"
              defaultValue={rating}
              max={5}
              precision={0.1}
              readOnly
            />
            <div ml-2>({rating})</div>
          </div>
          <div className="flex items-center text-base font-medium text-black font-inter">
            <img
              src="/img/location.png"
              alt="location"
              className="mr-2"
              style={{ width: "20px", height: "20px" }}
            />
            {province}
          </div>
        </div>
        <div className="flex items-center justify-center mx-2">
          <div className="bg-[#909090] w-px h-[80%]"></div>
        </div>
        <div className="flex flex-col justify-end w-[30%] h-full p-[10px] bottom-0  text-right text-right ">
          <div className="text-xl text-black mb-2 font-inter">THB {price}</div>

          <div>
            <button className="text-base p-2 bg-[#285F3E] rounded-lg text-white font-inter">
              Check Availability
            </button>
          </div>
        </div>
      </div>
    </InteractiveCard>
  );
}
