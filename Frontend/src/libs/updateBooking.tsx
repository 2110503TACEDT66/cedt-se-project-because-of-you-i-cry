//const fetch = require("node-fetch");

export default async function updateBooking(
  bookingId: string,
  apptDate: string,
  token: string
) {
  var now = new Date();
  const response = await fetch(
    `https://project-backend-eight.vercel.app/api-informations/reservations/${bookingId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        apptDate: apptDate,
        createdAt: now.toISOString(),
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update booking");
  }

  return await response.json();
}
