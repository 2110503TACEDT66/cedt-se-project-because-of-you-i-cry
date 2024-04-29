import styles from "./card.module.css";
import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import { Rating } from "@mui/material";
import { useState, useEffect, useRef } from "react";

export default function Card({
  campgroundName,
  imgSrc,
  price,
  province,
  rating,
  campgroundTags,
}: {
  campgroundName: string;
  imgSrc: string;
  price: number;
  province: string;
  rating: number;
  campgroundTags: string[];
}) {
  
  const [visibleTags, setVisibleTags] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [overflow, setOverflow] = useState<boolean>(false);
  useEffect(() => {
    const container = containerRef.current;
    const tag = tagRef.current;
    if (container && tag) {
      const containerWidth = container.offsetWidth;
      const dotWidth = tag.offsetWidth;
      let totalTagWidth = dotWidth;
      const visibleTags: string[] = [];
      
      campgroundTags.forEach((tag: string , index : number) => {
        const tagWidth = calculateTagWidth(tag);
        if (totalTagWidth + tagWidth <= containerWidth) {
          visibleTags.push(tag);
          totalTagWidth += tagWidth;
        } else {
          if(!overflow && index == campgroundTags.length && tagWidth <= dotWidth){
            visibleTags.push(tag);
          }
          setOverflow(true);
        }
      });
      
      setVisibleTags(visibleTags);
    }
  }, [campgroundTags]);

  useEffect(() => {
    
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.font = 'bold 14px Arial'; 
      }
    }
  }, []);

  const calculateTagWidth = (tagName: string) => {
    
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        
        const metrics = context.measureText(tagName);
        return metrics.width + 20; 
      }
    }
    
    return 0;
  };

  return (
    <InteractiveCard>
      <div className="w-full h-full relative rounded-lg flex flex-row shadow-md bg-[#F5F5F5]">
        <div className="w-[35%] h-[80%] rounded-lg p-3 mx-3 my-auto flex items-center justify-center relative pl-2">
          <Image
            src={imgSrc}
            alt="reduce risk"
            layout="fill"
            objectFit="fill"
            className="rounded-lg relative"
          />
        </div>
        <div className="w-[65%] h-full text-left p-2 my-auto">
          <div className="text-lg text-wrap font-inter pt-2">
            {campgroundName}
          </div>
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
          <div className="flex items-center mt-2 overflow-ellipsis max-w-80 " ref={containerRef}>
            {visibleTags.map((tag, index) => (
              <div
                key={index}
                className="px-2 py-1 mr-2 rounded-lg bg-[#AF9670] text-white whitespace-nowrap"
              >
                {tag}
              </div>
            ))}
            {visibleTags.length !== campgroundTags.length && <div className="px-2 py-1 mr-2 rounded-lg bg-[#AF9670] text-white whitespace-nowrap" ref={tagRef}>...</div>}
            <canvas ref={canvasRef} width={1} height={1} style={{ display: 'none' }} />
          </div>
          <div className="flex items-center text-base font-medium text-black font-inter mt-2">
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
            <button className="text-base p-2 bg-[#285F3E] rounded-lg text-white font-inter hover:bg-[#193d27]">
              Check Availability
            </button>
          </div>
        </div>
      </div>
    </InteractiveCard>
  );
  
}
