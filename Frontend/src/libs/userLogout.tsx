export default async function userLogOut() {
  const response = await fetch(
    "https://project-backend-eight.vercel.app/api-informations/users/logout",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: document.cookie, // ส่งคุกกี้ในการร้องขอ
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to Log-Out");
  }

  return await response.json();
}
