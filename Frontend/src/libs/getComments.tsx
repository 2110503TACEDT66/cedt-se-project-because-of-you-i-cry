'use server'

export default async function getComments(id: string) {
  const BACKEND_URL = process.env.BACKEND_URL
  const response = await fetch(
    `${BACKEND_URL}/api-informations/campgrounds/${id}/comment`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch comment");
  }

  return await response.json();
}
