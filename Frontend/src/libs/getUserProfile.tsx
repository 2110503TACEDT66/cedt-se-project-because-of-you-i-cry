//const fetch = require("node-fetch");
import { UserJson } from "../../interface";

export default async function getUserProfile(token: string): Promise<UserJson> {
  const response = await fetch(
    "https://project-backend-eight.vercel.app/api-informations/users/me",
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Cannot get user profile");
  }

  return await response.json();
}
