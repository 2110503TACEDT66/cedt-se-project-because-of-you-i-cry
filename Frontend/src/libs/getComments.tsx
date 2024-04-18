'use server'
import { CampgroundJson } from "../../interface";
//const fetch = require("node-fetch");
const BACKEND_URL = process.env.BACKEND_URL
export default async function getCampgrounds(): Promise<CampgroundJson> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const BACKEND_URL = process.env.BACKEND_URL
  const response = await fetch(
    `${BACKEND_URL}/api-informations/campgrounds`
  );

  if (!response.ok) {
    throw new Error(`${BACKEND_URL}/api-informations/campgrounds`);
  }

  return await response.json();
}
