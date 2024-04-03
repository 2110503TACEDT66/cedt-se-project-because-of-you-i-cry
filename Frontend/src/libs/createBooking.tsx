import { CreateBookingItem } from "../../interface";

const createBooking = async (campground: CreateBookingItem, token: string) => {
  const response = await fetch(
    `https://project-backend-eight.vercel.app/api-informations/campgrounds/${campground.campground}/reservations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(campground),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create booking");
  }

  return await response.json();
};

export default createBooking;
