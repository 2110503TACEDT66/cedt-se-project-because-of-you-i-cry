'use server'
//const fetch = require("node-fetch");

export default async function getSimilarCampgrounds(id: string) {
  const BACKEND_URL = process.env.BACKEND_URL
  const response = await fetch(
    `${BACKEND_URL}/api-informations/tags/campgrounds/${id}/similar2`,{cache : 'no-store'}
  );

  if (!response.ok) {
    throw new Error("Failed to fetch campground");
  }

  return await response.json();
}
