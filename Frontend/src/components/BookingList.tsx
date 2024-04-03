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
import Link from "next/link";

export default function ReservationBooking() {
  // const bookItems = useAppSelector(
  //   (state) => state.reduxPersistedReducer.bookSlice.bookItems
  // );
  const session = useSession();
  // console.log(session);

  const [reservation, setreservation] = useState<null | BookingItem[]>(null);
  const [role, setRole] = useState("");
  const [isDeleting, setisDeleting] = useState(false);
  const [ready, setReady] = useState(false);

  const fetchData = async () => {
    if (session.data?.user) {
      const res = await getBookings(session.data.user.token);
      const roleuser = await getUserProfile(session.data.user.token);
      setreservation(res.data);
      setRole(roleuser.data.role);
      setReady(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [session.data?.user]);

  return (
    <div className="min-h-[70vh]">
      {reservation && reservation.length > 0 ? (
        reservation.map((reservationItem) => (
          <div
            className="bg-slate-200 rounded-lg  px-5 m-5 py-5 my-4"
            key={reservationItem._id}
          >
            <div className="text-xl pl-2">
              {/* {reservationItem.name} {reservationItem.surname} */}
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
              href={`/editbooking?id=${reservationItem._id}`}
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
  );
}
