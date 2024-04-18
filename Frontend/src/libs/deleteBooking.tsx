'use server'

import { CampgroundItem } from "../../interface";
//const fetch = require("node-fetch");

export default async function deleteBooking(id: string, token: string) {
  const BACKEND_URL = process.env.BACKEND_URL
  const response = await fetch(
    `${BACKEND_URL}/api-informations/reservations/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch delete booking");
  }

  return await response.json();
}
