import { API_BASE_URL, API_ENDPOINT_BLOG_POSTS, API_ENDPOINT_NAME } from "../constants.mjs";
import { authFetch } from "../api/authFetch.mjs";


const method = "delete";

export async function removePost(id) {
    if (!id){
        throw new Error("Delete requires a post ID");
    }
    
    const deletePostURL = `${API_BASE_URL} ${API_ENDPOINT_BLOG_POSTS} ${API_ENDPOINT_NAME}/${id}`;

    const response = await authFetch(deletePostURL, {
        method
    })

    
    alert("You have deleted the post");


}