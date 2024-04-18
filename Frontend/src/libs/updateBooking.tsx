'use server'

export default async function updateBooking(
  bookingId: string,
  apptDate: string,
  token: string
) {
  var now = new Date();
  const BACKEND_URL = process.env.BACKEND_URL
  const response = await fetch(
    `${BACKEND_URL}/api-informations/reservations/${bookingId}`,
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
