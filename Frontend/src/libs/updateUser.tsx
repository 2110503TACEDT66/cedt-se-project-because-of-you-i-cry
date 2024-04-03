//const fetch = require("node-fetch");

export default async function updateUser(
  userid: string,
  userName: string,
  userEmail: string,
  token: string
) {
  const response = await fetch(
    `https://project-backend-eight.vercel.app/api-informations/users/update/${userid}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: userName,
        email: userEmail,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return await response.json();
}
