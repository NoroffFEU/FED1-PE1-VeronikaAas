import { API } from "../constants.mjs";
import { authFetch } from "../api/authFetch.mjs";

const API_ENDPOINT = API.API_ENDPOINT_BLOG_POSTS + API.API_ENDPOINT_NAME;
const API_BASE_URL = API.API_BASE_URL;
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