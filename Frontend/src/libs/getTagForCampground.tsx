'use server'

export default async function getTagsForCampground(id: string) {
  const BACKEND_URL = process.env.BACKEND_URL
  const response = await fetch(
    `${BACKEND_URL}/api-informations/tags/campgrounds/${id}/tags`, {cache : 'no-store'}
  );

  if (!response.ok) {
    //throw new Error("Failed to fetch tags");
  }

  return await response.json();
}