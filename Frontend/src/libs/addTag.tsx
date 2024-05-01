'use server'

import { TagJson } from "../../interface";
const BACKEND_URL = process.env.BACKEND_URL;

interface NewTag {
  name: string;
}

export default async function addTag(tag: NewTag , token: string): Promise<TagJson> {
  const response = await fetch(
    `${BACKEND_URL}/api-informations/tags`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: tag.name,
      }),
    }
  );

  if (!response.ok) {
    //throw new Error(`Failed to add tag: ${response.statusText}`);
  } 

  return await response.json();
}
