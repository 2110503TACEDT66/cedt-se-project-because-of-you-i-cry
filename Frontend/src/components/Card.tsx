import styles from "./card.module.css";
import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import { Rating } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import EditTagPopupEach from "./EditTagPopupEach"; // Import the EditTagPopupEach component
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";

export default function Card({
  campgroundId, // Add campgroundId to the props
  campgroundName,
  imgSrc,
  price,
  province,
  rating,
  campgroundTags,
  setEnable,
  setCampgroundId,
  role,
}: {
  campgroundId: string; // Add campgroundId type
  campgroundName: string;
  imgSrc: string;
  price: number;
  province: string;
  rating: number;
  campgroundTags: string[];
  setEnable: any;
  setCampgroundId: any;
  role: string;
}) {
  const [visibleTags, setVisibleTags] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [overflow, setOverflow] = useState<boolean>(false);
  const [pencilIconWidth, setPencilIconWidth] = useState<number>(0);
  const [showEditTagPopup, setShowEditTagPopup] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    const tag = tagRef.current;
    if (container && tag) {
      const containerWidth = container.offsetWidth;
      const dotWidth = tag.offsetWidth;
      let totalTagWidth = dotWidth;
      const visibleTags: string[] = [];

      campgroundTags.forEach((tag: string, index: number) => {
        const tagWidth = calculateTagWidth(tag);
        if (totalTagWidth + tagWidth <= containerWidth - 60) {
          visibleTags.push(tag);
          totalTagWidth += tagWidth;
        } else {
          if (
            !overflow &&
            index === campgroundTags.length - 1 &&
            tagWidth <= dotWidth
          ) {
            visibleTags.push(tag);
          }
          setOverflow(true);
        }
      });

      setVisibleTags(visibleTags);
    }
  }, [campgroundTags, pencilIconWidth]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.font = "bold 14px Arial";
        const pencilIconWidth = context.measureText("...").width + 60; // Adjust the value 30 as needed
        setPencilIconWidth(pencilIconWidth);
      }
    }
  }, []);

  const calculateTagWidth = (tagName: string) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        const metrics = context.measureText(tagName);
        return metrics.width + 20;
      }
    }

    return 0;
  };
  const handleEditTagsClick = () => {
    setEnable(true);
    setCampgroundId(campgroundId);
    setShowEditTagPopup(true); // Show the popup when the pencil icon is clicked
  };

  const handleCloseEditTagPopup = () => {
    setEnable(false);
    setShowEditTagPopup(false); // Close the popup when the "Save" button is clicked
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
          <div
            className="flex items-center mt-2 overflow-ellipsis max-w-80 "
            ref={containerRef}
          >
            {visibleTags.map((tag, index) => (
              <div
                key={index}
                className="px-2 py-1 mr-2 rounded-lg bg-[#AF9670] text-white whitespace-nowrap"
              >
                {tag}
              </div>
            ))}
            {visibleTags.length !== campgroundTags.length && (
              <div
                className="px-2 py-1 mr-2 rounded-lg bg-[#AF9670] text-white whitespace-nowrap"
                ref={tagRef}
              >
                ...
              </div>
            )}
            {role === "admin" ? (
              <div className="flex items-center">
                {/* Pencil icon */}
                <img
                  src="/img/pencil.png"
                  alt="edit"
                  className="h-8 ml-1 cursor-pointer" // Add cursor-pointer class
                  style={{ width: "auto" }}
                  onClick={(event) => {
                    event.preventDefault();
                    handleEditTagsClick();
                  }} // Call the handleEditTagsClick function when clicked
                />
              </div>
            ) : null}
            {/* Container for tags and pencil icon */}
            <canvas
              ref={canvasRef}
              width={1}
              height={1}
              style={{ display: "none" }}
            />
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
