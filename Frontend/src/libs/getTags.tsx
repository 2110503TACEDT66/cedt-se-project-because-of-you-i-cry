'use server'
import { TagJson } from "../../interface";
//const fetch = require("node-fetch");
const BACKEND_URL = process.env.BACKEND_URL
export default async function getTags(): Promise<TagJson> {
  const BACKEND_URL = process.env.BACKEND_URL
  const response = await fetch(
    `${BACKEND_URL}/api-informations/tags`,{cache : 'no-store'}
  );

  if (!response.ok) {
    throw new Error(`${BACKEND_URL}/api-informations/tags`);
  }

  return await response.json();
}
