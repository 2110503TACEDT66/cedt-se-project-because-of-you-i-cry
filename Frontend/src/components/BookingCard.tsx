"use client";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

export default function BookingCard({
  campgroundDetail,
  role,
}: {
  campgroundDetail: any;
  role: string;
}) {
  const [isOpened, setisOpened] = useState(false);
  return (
    <div
      className="bg-white rounded-lg my-2 w-[90%] flex flex-col justify-center items-center"
      key={campgroundDetail._id}
    >
      <div className="w-full p-4 flex flex-row justify-start items-center space-x-4">
        <div className="w-[15%]">
          <div className="p-1 bg-[#F5E5CB] text-center text-wrap rounded-lg">
            Campground
          </div>
        </div>
        <div className="w-[80%]">{campgroundDetail.campground.name}</div>
        <div className="w-[2%]">
          <img
            src="/img/more-detail.png"
            alt="moredetail-sign"
            onClick={() => {
              setisOpened(!isOpened);
            }}
            className={isOpened ? "rotate-180" : "rotate-0"}
          />
        </div>
      </div>
      {isOpened ? (
        <div className=" w-full p-4 pt-0 flex flex-row justify-center items-center border-t border-[#D5D5D5 ]">
          <div className="w-[50%] flex flex-col justify-start items-center">
            <table className="table-auto border-spacing-x-2 border-spacing-y-0 text-left text-wrap">
              <tbody>
                {role == "admin" ? (
                  <tr>
                    <td className="w-[25%] wrap align-top">User Id</td>
                    <td className="w-[75%] wrap align-top">
                      {campgroundDetail.user}
                    </td>
                  </tr>
                ) : null}
                <tr>
                  <td className="w-[25%] wrap align-top">Address</td>
                  <td className="w-[75%] wrap align-top">
                    {campgroundDetail.campground.address}
                    {", "}
                    {campgroundDetail.campground.district} district{", "}
                    {campgroundDetail.campground.province}
                    {", "}
                    {campgroundDetail.campground.region}{" "}
                    {campgroundDetail.campground.postalcode}
                  </td>
                </tr>
                <tr>
                  <td className="w-[25%] wrap align-top">Tel.</td>
                  <td className="w-[75%] wrap align-top">
                    {campgroundDetail.campground.tel}
                  </td>
                </tr>
                <tr>
                  <td className="w-[25%] wrap align-top">Date Check-In</td>
                  <td className="w-[75%] wrap align-top">
                    {dayjs(campgroundDetail.apptDate).format("YYYY/MM/DD")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-[25%] h-full flex flex-col justify-end items-end space-y-2">
            <Link href={`/editbooking?id=${campgroundDetail._id}`}>
              <button
                className="text-base p-2 bg-[#285F3E] rounded-lg text-white font-inter
              hover:bg-green-600 transition duration-200"
              >
                Manage
              </button>
            </Link>
            <div className="text-[12px] text-[#aaaaaa]">
              last update :{" "}
              {dayjs(campgroundDetail.createdAt).format("DD-MM-YYYY")}{" "}
              {dayjs(campgroundDetail.createdAt).format("hh:mm:ss")}
            </div>
          </div>
          <div className="w-[25%] rounded-xl m-4">
            <Image
              width={10000}
              height={0}
              src={campgroundDetail.campground.coverpicture}
              alt={`${campgroundDetail.campground.name} campground picture`}
              className="rounded-xl"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
