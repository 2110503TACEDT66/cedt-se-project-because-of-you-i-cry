'use server'
import { CreateBookingItem } from "../../interface";

const createTagToCampground = async (campgroundID:string , token: string , tagID : string) => {
  const BACKEND_URL = process.env.BACKEND_URL
  const response = await fetch(
    `${BACKEND_URL}/api-informations/tags/campgrounds/${campgroundID}/${tagID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create tags for this campground");
  }

  return await response.json();
};

export default createTagToCampground;
