import { CampgroundJson } from "../../interface";
//const fetch = require("node-fetch");

export default async function getCampgrounds(): Promise<CampgroundJson> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(
    "https://project-backend-eight.vercel.app/api-informations/campgrounds"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch campgrounds");
  }

  return await response.json();
}
