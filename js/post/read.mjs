import { API_BASE_URL, API_ENDPOINT_BLOG_POSTS, API_ENDPOINT_NAME } from "../constants.mjs";
import { authFetch } from "../api/authFetch.mjs";

export async function getPosts() {
    const updatePostURL = `${API_BASE_URL}${API_ENDPOINT_BLOG_POSTS}${API_ENDPOINT_NAME}`;

    try {
        const response = await authFetch(updatePostURL);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const posts = await response.json();
        console.log(posts);
        return posts;
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return [];
    }
}


export async function getPost(id) {
    if (!id){
        throw new Error("Get post requires a post ID");
    }

    const getPostURL = `${API_BASE_URL}${API_ENDPOINT_BLOG_POSTS}${API_ENDPOINT_NAME}/${id}`;

    const response = await authFetch(getPostURL, {
        
    })

    const result = await response.json();
    const post = result.data;
    return post;
}