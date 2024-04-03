import { CampgroundItem, BookingJson } from "../../interface";
//const fetch = require("node-fetch");

export default async function getBookings(token: string): Promise<BookingJson> {
  const response = await fetch(
    `https://project-backend-eight.vercel.app/api-informations/reservations`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return await response.json();
}
