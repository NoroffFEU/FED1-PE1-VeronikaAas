import * as API from "../constants.mjs";
import { authFetch } from "../api/authFetch.mjs";


const API_ENDPOINT = API.API_ENDPOINT_BLOG_POSTS + API.API_ENDPOINT_NAME;
const API_BASE_URL = API.API_BASE_URL;
const method = "post";

export async function createPost(postData) {
    const createPostURL = API_BASE_URL + API_ENDPOINT;
    
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