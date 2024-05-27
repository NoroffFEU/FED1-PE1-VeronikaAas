import { API_BASE_URL, API_ENDPOINT_BLOG_POSTS, API_ENDPOINT_NAME } from "../constants.mjs";
import { authFetch } from "../api/authFetch.mjs";

const method = "post";

export async function createPost(postData) {
    const createPostURL = API_BASE_URL + API_ENDPOINT_BLOG_POSTS + API_ENDPOINT_NAME;
    
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

import { isLoggedIn } from '../extras/isLoggedIn.mjs';

document.addEventListener('DOMContentLoaded', (event) => {
  if (!isLoggedIn()) {
    window.location.href = 'profile/login/index.html'; // Redirect to login page if not logged in
  }
});