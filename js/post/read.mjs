export async function getPosts() {}

export async function getPost(id) {}

import { API_BASE_URL } from "../constants.mjs";
import { authFetch } from "../api/authFetch.mjs";


export async function getPosts() {
    const getPostURL = API_BASE_URL + action;
    
    const response = await authFetch(getPostsURL, {

    });

    const posts = await response.json();
    return posts;
}

export async function getPost(id) {
    if (!id) {
        throw new Error("Get requires a postID");
    }

    const getPostURL = `${API_BASE_URL}${API_ENDPOINT}/${id}`;
    
    const response = await authFetch(getPostURL, {

    });

    const result = await response.json();
    const post = result.data;
    return post;
}