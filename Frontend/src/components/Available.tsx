import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import getBookings from "@/libs/getBooking";
import { BookingItem } from "../../interface";
import Link from "next/link";

export default function Available({ id }: { id: string }) {
  const session = useSession();

  const [reservation, setreservation] = useState<null | BookingItem[]>(null);
  const fetchData = async () => {
    if (session.data?.user) {
      const res = await getBookings(session.data.user.token);
      setreservation(res.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [session.data?.user]);

  const isDisabled =
    reservation &&
    reservation.length >= 3; /*session.data?.user.role == "user";*/

  return (
    <div className="w-[100%] h-[35vh] border-4 border-bg-black flex flex-col space-y-10 justify-center rounded-2xl m-5 items-center">
      <div className="text-center text-3xl">Want to Reserve?</div>

      {isDisabled ? (
        <button
          className="bg-gray-400 text-white py-5 px-3 rounded-lg relative text-center text-xl cursor-not-allowed"
          disabled
        >
          You can reserve only 3 reservation
        </button>
      ) : (
        <Link
          href={`/booking/?id=${id}`}
          className="w-[95%] flex justify-center items-center"
        >
          <button
            className="w-[70%] block bg-orange-600 text-white border border-white 
                                   py-5 px-3 rounded-lg relative text-center text-xl
                                   hover:bg-white hover:text-orange-700 
                                   hover:border-orange-700 hover:border-2"
          >
            Reserve
          </button>
        </Link>
      )}
    </div>
  );
}
