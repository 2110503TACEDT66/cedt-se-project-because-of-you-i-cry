//const fetch = require("node-fetch");

export default async function userLogIn(
  userEmail: string,
  userPassword: string
) {
  const response = await fetch(
    "https://project-backend-eight.vercel.app/api-informations/users/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to Log-In");
  }

  return await response.json();
}
