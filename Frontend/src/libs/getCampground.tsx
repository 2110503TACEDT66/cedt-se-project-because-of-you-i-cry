import { CampgroundItem } from "../../interface";
//const fetch = require("node-fetch");

export default async function getCampground(id: string) {
  const response = await fetch(
    `https://project-backend-eight.vercel.app/api-informations/campgrounds/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch campground");
  }

  return await response.json();
}
