import { API_BASE_URL, API_ENDPOINT_BLOG_POSTS, API_ENDPOINT_NAME } from "../constants.mjs";
import { authFetch } from "../api/authFetch.mjs";


const method = "DELETE";

export async function removePost(id) {
    if (!id){
        throw new Error("Delete requires a post ID");
    }
    
    const removePostURL = `${API_BASE_URL} ${API_ENDPOINT_BLOG_POSTS} ${API_ENDPOINT_NAME}/${id}`;

    const removePost = await authFetch(removePostURL, {
        method
    })

    
    alert("You have deleted the post");
    window.location.href = `/post/adminFeed.html?id=${id}`;

}
