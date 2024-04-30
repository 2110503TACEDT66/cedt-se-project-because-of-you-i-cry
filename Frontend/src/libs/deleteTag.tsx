'use server';

const BACKEND_URL = process.env.BACKEND_URL;

export default async function deleteTag(tagId: string, token: string): Promise<void> {
  if (!tagId || !token) {
    //throw new Error("Invalid arguments: tagId or token is missing.");
  }

  try {
    const response = await fetch(
      `${BACKEND_URL}/api-informations/tags/${tagId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Ensure correct header key
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text(); // Get detailed error message
      //throw new Error(`Failed to delete tag. Status: ${response.status}, Message: ${errorText}`);
    }
  } catch (error) {
    console.error("Error in deleteTag:", error);
    //throw error; // Re-//throw error to handle in the calling function
  }
}
