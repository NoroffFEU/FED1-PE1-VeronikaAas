import { getPosts } from "../js/post/read.mjs";

export function postTemplate(postData) {
    const postWrapper = document.createElement('div');
    postWrapper.classList.add('post'); // Assuming this is the class for each individual post
  
    const heading = document.createElement('h3');
    heading.textContent = postData.title;

    const ingrendiets = document.createElement('p')
    ingrendiets.textContent = postData.ingrendiets;

    const direction = document.createElement('p')
    direction.textContent = postData.direction;

    // Append heading and other elements to postWrapper
    postWrapper.appendChild(heading);
    postWrapper.appendChild(ingrendiets);
    postWrapper.appendChild(direction);

    return postWrapper; // Return the complete post structure
} 

export function renderPostTemplate(posts){
    const blogFeed = document.querySelector(".feedContainer");
    posts.forEach(post => {
        const postElement = postTemplate(post); // Create post element using template function
        blogFeed.appendChild(postElement); // Append the post to the feed container
    });
}

export async function renderPosts() {
    try {
        const postList = await getPosts();
        const posts = postList.data;
        renderPostTemplate(posts);
    } catch (error) {
        console.error("Error rendering posts:", error);
    }
}