import { API_BASE_URL } from "../constants.mjs";
import { authFetch } from "../api/authFetch.mjs";


const method = "delete";

export async function removePost(id) {
    if (!id){
        throw new Error("Delete requires a post ID");
    }
    
    const deletePostURL = `${API_BASE_URL}/${id}`;

    const response = await authFetch(deletePostURL, {
        method
    })

    
    alert("You have deleted the post");

    window.location.href = "posts/index.html";


}