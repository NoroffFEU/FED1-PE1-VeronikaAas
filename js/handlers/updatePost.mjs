import { updatePost } from "../post/update.mjs";
import { getPost } from "../post/read.mjs";

export async function setUpdatePostListener () {
    const form = document.querySelector("#editPost");

    const url = new URL(location.href);
    const id = url.searchParams.get("postId");

    if (form) {
        const button = form.querySelector("button");
        button.disabled = true;

        const post = await getPost(id);
        form.title.value = post.title;
        form.body.value = post.body;
        form.tags.value = post.tags.join(', '); 
        form.media.value = post.media.url; 

        
        form.title.addEventListener('input', () => button.disabled = false);
        form.body.addEventListener('input', () => button.disabled = false);
        form.tags.addEventListener('input', () => button.disabled = false);
        form.media.addEventListener('input', () => button.disabled = false);

        
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
    
            const formData = new FormData(form);
            const updatedPost = Object.fromEntries(formData.entries());
            updatedPost.id = id;
            updatedPost.tags = updatedPost.tags.split(',').map(tag => tag.trim()); 
            updatedPost.media = { url: updatedPost.media }; 

            try {
                await updatePost(updatedPost);
                alert('Post updated successfully');
                window.location.href = `/FED1-PE1-VeronikaAas/post/adminFeed.html?id=${id}`;
            } catch (error) {
                console.error('Failed to update post:', error);
                alert('Failed to update post');
            }
        });
    }
}