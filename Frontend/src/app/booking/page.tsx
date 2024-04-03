// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/redux/store";
// import { BookingItem } from "../../../interface";
// import { addBooking } from "@/redux/features/bookSlice";
"use client";
import { FormControl } from "@mui/material";
import DateReserve from "@/components/DateReserve";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CampgroundJson,
  CampgroundItem,
  CreateBookingItem,
  UserJson,
} from "../../../interface";
import getCampground from "@/libs/getCampground";
import { useSession } from "next-auth/react";
import createBooking from "@/libs/createBooking";
import SuccessModal from "@/components/SuccessModel";

export default function Booking() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();
  const session = useSession();

  const urlParams = useSearchParams();
  const id = urlParams.get(`id`);
  const [campgroundResponse, setCampgroundResponse] =
    useState<null | CampgroundItem>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campground = await getCampground(id as string);
        setCampgroundResponse(campground.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const makeReservation = () => {
    if (id && campgroundResponse && session.data) {
      try {
        const item: CreateBookingItem = {
          apptDate: dayjs(checkin).toISOString(),
          user: session.data.user._id,
          campground: id,
        };
        createBooking(item, session.data.user.token);
      } catch (error) {
        console.log(error);
      }
      // dispatch(addBooking(item));
      // router.push("/success");
    } else {
      alert("Please Choose your campground to reserve");
    }
  };

  const [checkin, setCheckin] = useState<Dayjs | null>(null);
  const currentDate = dayjs();

  return (
    <main className="w-[100%]  flex flex-wrap flex-col items-center space-y-4 mb-10">
      <div className="text-4xl m-5 my-10 text-center">
        Campground Booking : {campgroundResponse?.name}
      </div>
      <div
        className="w-[50%] h-[60vh] flex flex-wrap flex-col border border-black items-center m-10 rounded-xl justify-center
                      space-y-5"
      >
        <div className="text-3xl m-5 text-center">Pick a Date to reserve</div>
        <FormControl className="rounded-md w-[80%] p-5 space-y-5 items-center flex flex-col justify-center">
          <div className="mt-4 w-[100%] flex flex-row items-center justify-center space-x-5">
            <div className="w-[7%] text-right text-lg">Date</div>
            <DateReserve
              onDateChange={(value: Dayjs) => {
                if (value.isAfter(currentDate)) {
                  //alert("set Check IN")
                  setCheckin(value);
                } else {
                  alert(
                    "Please select a date other than today and before today."
                  );
                }
              }}
            />
          </div>
          <div className="m-5 w-[100%] h-[8vh] flex flex-col justify-center items-center">
            <button
              type="submit"
              name="Book Vaccine"
              className="block rounded-lg bg-orange-600 hover:bg-green-600 hover:ring-green-300 
          px-3 py-2 text-white shadow-sm w-[60%] h-[80%] text-xl"
              onClick={() => {
                if (checkin) {
                  setShowSuccessModal(true);
                  makeReservation();
                } else {
                  alert("Please pick a date to reserve. ");
                }
              }}
            >
              Book Campground
            </button>
          </div>
          <SuccessModal
            isOpen={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
          />
        </FormControl>
      </div>
    </main>
  );
}

/*
<div
        className="space-y-1 w-[60vw] rounded-xl bg-slate-100 border-slate-500 border 
            flex flex-col justify-start text-left items-start "
      >
        <table className="table-auto border-separate border-spacing-2 m-5">
          <tbody>
            <tr>
              <td>id : </td>
              <td>{profile.data._id}</td>
            </tr>
            <tr>
              <td>Name : </td>
              <td>{profile.data.name}</td>
            </tr>
            <tr>
              <td>Email : </td>
              <td>{profile.data.email}</td>
            </tr>
            <tr>
              <td>Tel. : </td>
              <td>{profile.data.tel}</td>
            </tr>
            <tr>
              <td>Member Since : </td>
              <td>{createdAt.toString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
*/
