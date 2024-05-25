import { API_BASE_URL } from "../constants.mjs";
import { authFetch } from "../api/authFetch.mjs";

const method = "post";

export async function createPost(postData) {
    const createPostURL = API_BASE_URL + action;
    
    const response = await authFetch(createPostURL, {
        method,
        body: JSON.stringify(postData)
    });

    if (response.ok) {
        alert("You have created a post!");
    } else {
        alert("We couldn't create your post, please try again.")
    }

    return await response.json();
}