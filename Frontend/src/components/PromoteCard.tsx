"use client";
import VideoPlayer from "./VideoPlayer";
import { useState } from "react";
import { useWindowListener } from "@/hooks/useWindowListener";

export default function PromoteCard() {
  const [playing, setPlaying] = useState(true);

  useWindowListener("contextmenu", (e) => {
    e.preventDefault();
  });

  return (
    <div className="w-full block space-y-5 items-center">
      <div className="fm-5 flex flex-row flex-wrap justify-center">
        <div className="w-[40%] m-5 relative">
          <VideoPlayer vdoSrc="/vdo/getvaccine.mp4" isPlaying={playing} />
        </div>
        <div className="flex flex-col w-[40%] h-full m-5 relative space-y-10">
          <h3 className="text-2xl underline space-y-2 font-semibold top-0">
            Get your vaccine today
          </h3>
          <p className="text-medium">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis,
            tenetur? Quia, rem officiis? Consequatur commodi molestiae
            consectetur neque quasi iure aut quod cupiditate, facilis aliquam
            numquam? Voluptate perspiciatis minima quasi.
          </p>
          <button
            className="bg-cyan-700 text-white border border-white 
            font-semibold p-2 m-3 rounded-lg relative bottom-0
            hover:bg-white hover:text-cyan-700 hover:border-cyan-700 
            hover:border-2"
            onClick={() => {
              setPlaying(!playing);
            }}
          >
            {playing ? "Pause" : "Play"}
          </button>
        </div>
      </div>
    </div>
  );
}
