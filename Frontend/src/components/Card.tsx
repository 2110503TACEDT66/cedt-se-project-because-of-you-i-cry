import styles from "./card.module.css";
import Image from "next/image";
import InteractiveCard from "./InteractiveCard";

export default function Card({
  campgroundName,
  imgSrc,
  price,
  province,
}: {
  campgroundName: string;
  imgSrc: string;
  price: number;
  province: string;
}) {
  return (
    <InteractiveCard>
      <div className="w-[70%] h-full relative rounded-t-lg flex flex-row">
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
          <div className="text-xl text-wrap font-semibold">
            {campgroundName}
          </div>
          <div className="flex items-center text-lg font-medium text-slate-400">
            <img
              src="/img/location.png"
              alt="location"
              className="mr-2"
              style={{ width: "20px", height: "20px" }}
            />
            {province}
          </div>
        </div>
      </div>
      <div
        className="w-[30%] h-full p-[10px] bottom-0 
                  text-black font-sans font-semibold text-right text-wrap 
                  setanimation items-right border border-l-black "
      >
        <div className=" text-3xl h-[70%] text-green-600">{price} THB</div>
        <div>
          <button className="text-lg h-[30%] p-2 bg-orange-600 rounded-lg text-white items-end hover:bg-orange-800">
            Check Availability
          </button>
        </div>
      </div>
    </InteractiveCard>
  );
}
