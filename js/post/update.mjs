export async function updatePost(id) {}

import { API_BASE_URL } from "../constants.mjs";
import { authFetch } from "../api/authFetch.mjs";

const method = "put";

export async function updatePost(postData) {
    if (!postData.id) {
        throw new Error("Update requires a postID");
    }

    const updatePostURL = `${API_BASE_URL}${API_ENDPOINT}/${postData.id}`;
    
    const response = await authFetch(createPostURL, {
        method,
        body: JSON.stringify(postData)
    })

    if (response.ok) {
        alert("You have updated your post!");
    } else {
        alert("Something went wrong, try again.");
    }

    return await response.json();
}