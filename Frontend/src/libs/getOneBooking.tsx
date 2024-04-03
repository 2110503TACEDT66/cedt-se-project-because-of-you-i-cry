import { BookingJson, BookingItem, BookingOneJson } from "../../interface";
//const fetch = require("node-fetch");

export default async function getOneBooking(
  id: string,
  token: string
): Promise<BookingOneJson> {
  const response = await fetch(
    `https://project-backend-eight.vercel.app/api-informations/reservations/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch booking");
  }

  return await response.json();
}
