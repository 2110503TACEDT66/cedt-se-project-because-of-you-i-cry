'use server'
import { CampgroundItem, BookingJson } from "../../interface";
//const fetch = require("node-fetch");

export default async function getBookings(token: string): Promise<BookingJson> {
  const BACKEND_URL = process.env.BACKEND_URL
  const response = await fetch(
    `${BACKEND_URL}/api-informations/reservations`,
    {
      cache : 'no-store',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    //throw new Error("Failed to fetch bookings");
  }

  return await response.json();
}
