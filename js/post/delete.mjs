import { API_BASE_URL } from "../constants.mjs";
import { authFetch } from "../api/authFetch.mjs";

const method = "delete";

export async function removePost(id) {
    if (!id) {
        throw new Error("Deleting a post requires a postID");
    }

    const removePostURL = `${API_BASE_URL}${action}/${id}`;
    
    const response = await authFetch(removePostURL, {
        method 
    })

    return await response.json();
}