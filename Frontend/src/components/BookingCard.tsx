"use client"
import { useState, useEffect } from "react";

export default function BookingCard(reservationItem:) {
  return(
    <div
              className="bg-white rounded-lg my-4 w-[90%] flex flex-col justify-center items-center"
              key={reservationItem._id}
            >
              <div className="w-full p-4 flex flex-row justify-start items-center space-x-4">
                <div className="w-[15%]">
                  <div className="p-1 bg-[#F5E5CB] text-center text-wrap rounded-lg">
                    Campground
                  </div>
                </div>
                <div className="w-[80%]">{reservationItem.campground.name}</div>
                <div className="w-[2%]">
                  <img
                    src="/img/more-detail.png"
                    alt="moredetail-sign"
                    onClick={() => {
                      setisOpened(!isOpened);
                    }}
                    className={isOpened ? "rotate-0" : "rotate-180"}
                  />
                </div>
              </div>
              <div className=" w-full p-4 pt-0 flex flex-row justify-center items-center">
                <div className="w-[50%] flex flex-col justify-start items-center">
                  <table className="table-auto border-spacing-x-2 border-spacing-y-0 text-left text-wrap">
                    <tbody>
                      {role == "admin" ? (
                        <tr>
                          <td className="w-[25%] wrap">User Id</td>
                          <td className="w-[75%] wrap">
                            {reservationItem.user}
                          </td>
                        </tr>
                      ) : null}
                      <tr>
                        <td className="w-[25%] wrap">Status</td>
                        <td className="w-[75%] wrap flex flex-row justify-start items-start">
                          Pay Successfully{" "}
                          <span className="ml-2">
                            <img
                              src="/img/paysuccess.png"
                              alt="correct image"
                              className="object-contain w-[50%]"
                            />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="w-[25%] wrap">Address</td>
                        <td className="w-[75%] wrap">
                          {reservationItem.campground.address}
                          {", "}
                          {reservationItem.campground.district} district{", "}
                          {reservationItem.campground.province}
                          {", "}
                          {reservationItem.campground.region}{" "}
                          {reservationItem.campground.postalcode}
                        </td>
                      </tr>
                      <tr>
                        <td className="w-[25%] wrap">Tel.</td>
                        <td className="w-[75%] wrap">
                          {reservationItem.campground.tel}
                        </td>
                      </tr>
                      <tr>
                        <td className="w-[25%] wrap">Date Check-In</td>
                        <td className="w-[75%] wrap">
                          {dayjs(reservationItem.apptDate).format("YYYY/MM/DD")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="w-[25%] h-full flex flex-col justify-end items-end space-y-2">
                  <Link href={`/editbooking?id=${reservationItem._id}`}>
                    <button className="text-base p-2 bg-[#285F3E] rounded-lg text-white font-inter">
                      Manage
                    </button>
                  </Link>
                  <div className="text-[12px] text-[#aaaaaa]">
                    last update :{" "}
                    {dayjs(reservationItem.createdAt).toString().split("GMT")}
                  </div>
                </div>
                <div className="w-[25%] rounded-xl m-4">
                  <Image
                    width={10000}
                    height={0}
                    src={reservationItem.campground.coverpicture}
                    alt={`${reservationItem.campground.name} campground picture`}
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
  );
}
