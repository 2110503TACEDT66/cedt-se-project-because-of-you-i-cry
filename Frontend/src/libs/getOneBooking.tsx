'use server'
import { BookingJson, BookingItem, BookingOneJson } from "../../interface";
//const fetch = require("node-fetch");

export default async function getOneBooking(
  id: string,
  token: string
): Promise<BookingOneJson> {
  const BACKEND_URL = process.env.BACKEND_URL
  const response = await fetch(
    `${BACKEND_URL}/api-informations/reservations/${id}`,
    {
      cache : 'no-store',
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
