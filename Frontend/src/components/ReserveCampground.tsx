// "use client";
// import { FormControl } from "@mui/material";
// import DateReserve from "@/components/DateReserve";
// import dayjs, { Dayjs } from "dayjs";
// import { useSearchParams } from "next/navigation";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/redux/store";
// import { BookingItem } from "../../interface";
// import getUserProfile from "@/libs/getUserProfile";
// import session from "redux-persist/lib/storage/session";

// export default async function ReserveCampground() {
//   const dispatch = useDispatch<AppDispatch>();
//   const urlParams = useSearchParams();
//   const campground = urlParams.get(`id`);

//   const makeReservation = () => {
//     if (campground) {
//       const item: BookingItem = {
//         campgroundid: campground,
//         checkin: dayjs(pickupDate).format("YYYY/MM/DD"),
//         checkout: dayjs(pickupDate).format("YYYY/MM/DD"),
//       };
//       dispatch(addBooking(item));
//     }
//   };

//   const [pickupDate, setPickupDate] = useState<Dayjs | null>(null);

//   return (
//     <main className="w-[100%] flex flex-col items-center space-y-4">
//       <FormControl className="rounded-md w-[80%] p-5 space-y-4 items-center">
//         <div className="flex flex-row space-x-5">
//           <div className="mt-4 w-[100%] w-[100%]">
//             <DateReserve
//               onDateChange={(value: Dayjs) => {
//                 setPickupDate(value);
//               }}
//             />
//           </div>
//           <div className="mt-4 w-[100%] w-[100%]">
//             <DateReserve
//               onDateChange={(value: Dayjs) => {
//                 setPickupDate(value);
//               }}
//             />
//           </div>
//         </div>
//         <div className="m-5 w-[100%] h-[10vh] flex flex-col justify-center items-center">
//           <button
//             type="submit"
//             name="Book Vaccine"
//             className="block rounded-lg bg-cyan-700 hover:bg-green-600 hover:ring-green-300
//           px-3 py-2 text-white shadow-sm w-[60%] h-[80%] text-lg"
//             onClick={makeReservation}
//           >
//             Book Campground
//           </button>
//         </div>
//       </FormControl>
//     </main>
//   );
// }
