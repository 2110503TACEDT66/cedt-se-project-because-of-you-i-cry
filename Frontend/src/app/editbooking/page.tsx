"use client";
import { useSearchParams, useRouter } from "next/navigation";
import DateReserve from "@/components/DateReserve";
import getUserProfile from "@/libs/getUserProfile";
import { BookingItem } from "../../../interface";
import getOneBooking from "@/libs/getOneBooking";
import updateBooking from "@/libs/updateBooking";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { FormControl } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";

export default function EditBooking() {
  const router = useRouter();
  const session = useSession();
  // console.log(session.data.user);

  const urlParams = useSearchParams();
  const id = urlParams.get(`id`);
  const [bookingResponse, setBookingResponse] = useState<null | BookingItem>(
    null
  );
  const [name, setName] = useState<null | string>(null);
  const [email, setEmail] = useState<null | string>(null);
  const [tel, setTel] = useState<null | string>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session && session.data && session.data.user) {
          const booking = await getOneBooking(
            id as string,
            session.data?.user.token
          );
          setBookingResponse(booking.data);
          const profile = await getUserProfile(session.data.user.token);
          setName(profile.data.name);
          setEmail(profile.data.email);
          setTel(profile.data.tel);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, session.data?.user]);

  const [checkin, setCheckin] = useState<Dayjs | null>(null);

  if (!session || !session.data) return null;

  const updateReservation = () => {
    if (id && bookingResponse && session.data) {
      try {
        if (checkin == null) {
          updateBooking(id, bookingResponse.apptDate, session.data.user.token);
        } else {
          updateBooking(
            id,
            dayjs(checkin).toISOString(),
            session.data.user.token
          );
        }
      } catch (error) {
        console.log(error);
      }
      // dispatch(addBooking(item));
      alert("edit success");
      if (router) {
        // alert("Login success");
        window.location.reload();
        window.location.href = "/profile/booking";
      }
    } else {
      alert("the data did not change");
    }
  };

  return (
    <main className="w-[100%]  block items-center space-y-4 mb-10 justify-center">
      <div className="text-2xl mx-5 mt-10 text-center relative">
        {bookingResponse?.campground.name}
      </div>
      <div className="text-sm mx-5 text-center relative text-gray-500">
        bookingID: {bookingResponse?._id}
      </div>
      <div
        className="w-[100%] h-[65vh] items-center content-center
                      space-x-5 flex flex-col relative"
      >
        <div className="w-[73%] text-left text-xl">Booking Detail:</div>
        <FormControl
          className="w-[100%] h-[90%] space-x-16 flex items-center justify-center relative"
          style={{ flexDirection: "row" }}
        >
          <div className="w-[35%] h-[90%] border border-black rounded-xl flex flex-col relative overflow-y-auto overflow-x-none">
            <div className="px-5 pt-5 pb-1 flex flex-row flex-wrap">
              <div className="mr-2 w-[5%] mb-2">
                <Image
                  src={"/img/location.png"}
                  alt="location"
                  width={30}
                  height={30}
                />
              </div>
              <div>
                {bookingResponse?.campground?.address}
                {bookingResponse?.campground?.district} district,{" "}
                {bookingResponse?.campground?.province}
                {bookingResponse?.campground?.postalcode}
              </div>
            </div>
            <a
              href={bookingResponse?.campground.url}
              className="flex items-center text-blue-500"
            >
              <div className="pl-5 text-sm flex items-center">
                Visit campground website
                <Image
                  src={"/img/link.png"}
                  alt="location"
                  width={20}
                  height={20}
                  className="ml-2"
                />
              </div>
            </a>
            <div className="border-b border-black">
              <div
                className="mt-4 w-[100%] flex flex-row items-center justify-center space-x-5 p-5"
                style={{ flexDirection: "row" }}
              >
                <div className="text-right">New Date</div>
                <div>
                  <DateReserve
                    onDateChange={(value: Dayjs) => {
                      setCheckin(value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="pt-5 pl-5 text-xl">Contact Information</div>
            <div className="pt-3 pl-10 pb-5 text-gray-500">
              <div>Name: {name}</div>
              <div>Email: {email}</div>
              <div>Tel: {tel}</div>
            </div>
          </div>
          <div className="w-[35%] h-[90%] flex flex-col justify-start content-start border border-black rounded-xl relative">
            <div className="text-lg text-left w-[100%] pl-10 pt-10">Price</div>
            <div className="text-2xl text-left w-[100%] h-[20%] pl-10">
              THB {bookingResponse?.campground.price}/night
            </div>
            <div className="text-lg text-left w-[100%] h-[30%] pl-10">
              Current Date:{" "}
              {dayjs(bookingResponse?.apptDate).format("YYYY/MM/DD")}
            </div>
            <div className="w-[100%] h-[20%] flex flex-row justify-center items-center space-x-10 my-5">
              <button
                type="submit"
                name="Book Vaccine"
                className="block rounded-lg bg-orange-600 hover:bg-white hover:ring-red-300 hover:text-orange-600
                           px-3 py-2 text-white shadow-sm w-[30%] border-2 border-orange-600"
                onClick={() => router.back()}
              >
                Cancel
              </button>
              <button
                type="submit"
                name="Book Vaccine"
                className="block rounded-lg bg-orange-600 hover:bg-green-600 hover:ring-green-300 
          px-3 py-2 text-white shadow-sm w-[30%] border-2 border-orange-600 hover:border-green-300"
                onClick={updateReservation}
              >
                Save edit
              </button>
            </div>
          </div>
        </FormControl>
      </div>
    </main>
  );
}
