"use client";
// import { useAppSelector, AppDispatch } from "@/redux/store";
// import { useDispatch } from "react-redux";
// import { removeBooking } from "@/redux/features/bookSlice";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { BookingItem, UserJson } from "../../interface";
import deleteBooking from "@/libs/deleteBooking";
import getBookings from "@/libs/getBooking";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";
import styles from "@/components/bookinglistscroll.module.css";
import BookingCard from "./BookingCard";
import Link from "next/link";
import Image from "next/image";

export default function ReservationBooking() {
  // const bookItems = useAppSelector(
  //   (state) => state.reduxPersistedReducer.bookSlice.bookItems
  // );
  const session = useSession();
  // console.log(session);

  const [reservations, setreservations] = useState<null | BookingItem[]>(null);
  const [role, setRole] = useState("");
  const [userName, setuserName] = useState("");
  const [userImage, setuserImage] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [userTel, setuserTel] = useState("");
  const [ready, setReady] = useState(false);

  const fetchData = async () => {
    if (session.data?.user) {
      console.log(session)
      const res = await getBookings(session.data.user.token);
      const roleuser = await getUserProfile(session.data.user.token);
      setreservations(res.data);
      setRole(roleuser.data.role);
      setuserName(roleuser.data.name);
      setuserEmail(roleuser.data.email);
      setuserTel(roleuser.data.tel);
      setReady(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [session.data?.user]);

  useEffect(() => {}, [reservations]);

  return (
    <div className="w-full mt-[5vh] space-y-8 flex flex-col justify-center items-center font-poppins3">
      <div className="w-full h-[15vh] bg-[#F5E5CB] flex flex-row justify-center items-center">
        <div className="w-[80%] h-full flex flex-row justify-start items-start">
          <div className="min-w-[40%] max-w-[100%] h-full bg-white flex flex-row justify-center items-center">
            <div className="rounded-full w-[22%] ml-4 h-full">
              <img
                src={"/img/logo2.png"}
                alt="profile picture"
                className="object-contain w-full h-full"
              />
            </div>
            <div className="w-[75%] h-full flex flex-col justify-center items-start flex-wrap ml-8">
              <table className="table-auto border-spacing-x-2 border-spacing-y-0">
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>: {userName}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>: {userEmail}</td>
                  </tr>
                  <tr>
                    <td>Tel</td>
                    <td>: {userTel}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[80%] bg-[#F5F5F5] rounded-[20px] p-2 flex flex-col justify-center items-center overflow-hidden">
        <div
          className={`w-[100%] bg-[#F5F5F5] h-[60vh] overflow-y-scroll overflow-x-hidden flex flex-col 
        justify-start items-center ${styles.bookinglist} overscroll-y-contain py-4`}
        >
          {reservations && reservations.length > 0 ? (
            reservations.map((reservationItem) => (
              <BookingCard campgroundDetail={reservationItem} role={role} />
            ))
          ) : ready ? (
            <h1 className="text-center text-2xl m-12 font-poppins3">
              "No Campground Booking"
            </h1>
          ) : (
            <h1 className="text-center text-2xl m-12 font-poppins3">
              Campground Booking Loading...
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}

/*
<div className="min-h-[70vh]">
      {reservation && reservation.length > 0 ? (
        reservation.map((reservationItem) => (
          <div
            className="bg-slate-200 rounded-lg  px-5 m-5 py-5 my-4"
            key={reservationItem._id}
          >
            <div className="text-xl pl-2">
              {{reservationItem.name} {reservationItem.surname}}
              </div>
              <table className="table-auto border-separate border-spacing-2">
                <tbody>
                  {role == "admin" ? (
                    <tr>
                      <td>User Id</td>
                      <td>{reservationItem.user}</td>
                    </tr>
                  ) : null}
                  <tr>
                    <td>Campground Name</td>
                    <td>{reservationItem.campground.name}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>
                      {reservationItem.campground.address}{" "}
                      {reservationItem.campground.district}{" "}
                      {reservationItem.campground.province}{" "}
                      {reservationItem.campground.region}{" "}
                      {reservationItem.campground.postalcode}
                    </td>
                  </tr>
                  <tr>
                    <td>Tel.</td>
                    <td>{reservationItem.campground.tel}</td>
                  </tr>
                  <tr>
                    <td>Date Check-In</td>
                    <td>
                      {dayjs(reservationItem.apptDate).format("YYYY/MM/DD")}
                    </td>
                  </tr>
                </tbody>
              </table>
              <Link
                href={`/neweditbooking?id=${reservationItem._id}`}
                className="wrap"
              >
                <button
                  disabled={isDeleting}
                  className={
                    isDeleting
                      ? "block bg-slate-600 text-white border border-white p-2 rounded-lg relative bottom-0"
                      : "block bg-orange-600 text-white border border-white p-2 rounded-lg relative bottom-0 hover:bg-white hover:text-orange-700 hover:border-orange-700 border-2"
                  }
                >
                  Edit Campground Booking
                </button>
              </Link>
              <button
                disabled={isDeleting}
                className={
                  isDeleting
                    ? "block bg-slate-600 text-white border border-white p-2 rounded-lg relative bottom-0"
                    : "block bg-orange-600 text-white border border-white p-2 rounded-lg relative bottom-0 hover:bg-white hover:text-orange-700 hover:border-orange-700 border-2"
                }
                onClick={async () => {
                  if (session.data) {
                    setisDeleting(true);
                    try {
                      await deleteBooking(
                        reservationItem._id,
                        session.data?.user.token
                      );
                      fetchData();
                    } catch (error) {
                      console.log(error);
                    } finally {
                      setisDeleting(false);
                    }
                  }
                }}
              >
                Remove Campground Booking
              </button>
            </div>
          ))
        ) : ready ? (
          <h1 className="text-center text-2xl m-16">"No Campground Booking"</h1>
        ) : (
          <h1 className="text-center text-2xl m-16">
            Campground Booking Loading...
          </h1>
        )}
      </div>
*/
