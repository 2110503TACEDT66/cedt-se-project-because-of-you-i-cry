'use server'
import { CampgroundItem } from "../../interface";
//const fetch = require("node-fetch");

export default async function getCampground(id: string) {
  const BACKEND_URL = process.env.BACKEND_URL
  const response = await fetch(
    `${BACKEND_URL}/api-informations/campgrounds/${id}`,{cache : 'no-store'}
  );

  if (!response.ok) {
    throw new Error("Failed to fetch campground");
  }

  return await response.json();
}
