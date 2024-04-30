"use server";

const deleteTagFromCampground = async (
  campgroundID: string,
  token: string,
  tagID: string
) => {
  const BACKEND_URL = process.env.BACKEND_URL;
  const response = await fetch(
    `${BACKEND_URL}/api-informations/tags/campgrounds/${campgroundID}/${tagID}`,
    {
      cache: "no-store",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorMessage = await response.text(); // Get error message from server response
    //throw new Error(`Failed to delete tag: ${errorMessage}`);
  }

  return await response.json();
};

export default deleteTagFromCampground;
