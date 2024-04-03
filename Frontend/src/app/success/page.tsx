"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white shadow-md ">
      <div className="flex flex-col justify-center border border-black p-16 rounded-xl ">
        <div className="w-[100%]">
          <div className="w-[100%] items-center p-2 flex justify-center">
            <img
              src="/img/correct.png"
              alt="correct"
              className="object-contain"
              width={"150vh"} // Adjust width as needed
              height={"150vh"} // Adjust height as needed
            />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-16 text-center">
            Booking successful!
          </h1>
          <h1 className="text-xl mb-1 text-center">
            Your booking has been confirmed.
          </h1>
          <h1 className="text-xl mb-1 text-center">
            Check your booking on Booking page
          </h1>
        </div>
        <button
          onClick={() => {
            window.location.reload();
            window.location.href = "/";
          }}
          className="w-[100%] items-center my-10 py-3 px-6 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          OK
        </button>
      </div>
    </div>
  );
}
