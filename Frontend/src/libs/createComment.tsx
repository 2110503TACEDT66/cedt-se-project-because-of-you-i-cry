'use server'

type CreateCommentItem = {
    campground_id: string;
    user_id: string;
    text: string;
    user_rating: number;
    token: string;
};

const createComment = async (commentData: CreateCommentItem) => {
    const { campground_id, user_id, text, user_rating, token } = commentData;
    const BACKEND_URL = process.env.BACKEND_URL;

    const response = await fetch(
        `${BACKEND_URL}/api-informations/comments/${campground_id}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                campground_id,
                user_id,
                text,
                user_rating,
            }),
        }
    );

    console.log("Response status:", response.status);
    console.log("Response body:", await response.text()); // Output the response body for debugging

    if (!response.ok) {
        const errorData = await response.json(); // Parse error data from the response
        console.error("Failed to create comment:", errorData.message); // Output the error message from the server
        //throw new Error("Failed to create comment");
    }

    return await response.json();
};

export default createComment;
