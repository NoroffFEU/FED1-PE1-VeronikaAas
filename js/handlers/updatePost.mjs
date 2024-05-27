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
        form.tags.value = post.tags.join(', '); // Assuming tags are an array
        form.media.value = post.media.url; // Assuming media is an object with a URL

        // Add change event listeners to enable the button when form changes
        form.title.addEventListener('input', () => button.disabled = false);
        form.body.addEventListener('input', () => button.disabled = false);
        form.tags.addEventListener('input', () => button.disabled = false);
        form.media.addEventListener('input', () => button.disabled = false);

        // Handle form submission
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
    
            const formData = new FormData(form);
            const updatedPost = Object.fromEntries(formData.entries());
            updatedPost.id = id;
            updatedPost.tags = updatedPost.tags.split(',').map(tag => tag.trim()); // Convert tags to an array
            updatedPost.media = { url: updatedPost.media }; // Ensure media is an object with a URL

            try {
                await updatePost(updatedPost);
                alert('Post updated successfully');
                // Optionally, redirect or refresh the page
                window.location.href = `/post/adminFeed.html?id=${id}`;
            } catch (error) {
                console.error('Failed to update post:', error);
                alert('Failed to update post');
            }
        });
    }
}