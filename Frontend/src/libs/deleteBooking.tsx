import { CampgroundItem } from "../../interface";
//const fetch = require("node-fetch");

export default async function deleteBooking(id: string, token: string) {
  const response = await fetch(
    `https://project-backend-eight.vercel.app/api-informations/reservations/${id}`,
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
