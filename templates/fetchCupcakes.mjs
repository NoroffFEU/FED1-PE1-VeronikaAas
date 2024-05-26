import { authFetch } from "../js/api/authFetch.mjs";
import { API_BASE_URL, API_ENDPOINT_BLOG_POSTS, API_ENDPOINT_NAME } from "../js/constants.mjs";

// Function to fetch all posts and filter by tag "cupcake"
async function fetchCupcakePosts() {
    try {
        const response = await authFetch(`${API_BASE_URL}${API_ENDPOINT_BLOG_POSTS}${API_ENDPOINT_NAME}`);
        const postList = await response.json();

        if (postList.data) {
            // Filter posts with the tag "cupcake"
            const cupcakePosts = postList.data.filter(post => post.tags.includes("cupcake"));
            renderPostsTemplate(cupcakePosts);
        } else {
            console.error('Data is missing in the response:', postList);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export function postTemplate(postData) {
    const postWrapper = document.createElement('div');
    postWrapper.classList.add('post');
  
    const heading = document.createElement('h2');
    heading.textContent = postData.title;
  
    const author = document.createElement('p');
    author.textContent = `By: ${postData.author.name}`;
  
    const mediaContainer = document.createElement('div');
    mediaContainer.classList.add('media-container');
    if (postData.media && postData.media.url) {
      const media = document.createElement('img');
      media.setAttribute('src', postData.media.url);
      media.setAttribute('alt', postData.media.alt || 'Post image');
      mediaContainer.appendChild(media);
    }
  
    const body = document.createElement('p');
    body.textContent = postData.body;
  
  
    const tagsContainer = document.createElement('div');
    tagsContainer.classList.add('tagsContainer');
    postData.tags.forEach(tag => {
      const tagElement = document.createElement('span');
      tagElement.classList.add('tag');
      tagElement.textContent = tag;
      tagsContainer.appendChild(tagElement);
    });
  
    postWrapper.append(heading, author, mediaContainer, body, tagsContainer);
    return postWrapper;
  }

// Function to render the posts on the page
export function renderPostsTemplate(posts) {
    const blogFeed = document.querySelector(".feedContainer");
    if (!blogFeed) {
      console.error("Element with class 'feedContainer' not found.");
      return;
    }
    posts.forEach(post => {
      try {
        blogFeed.appendChild(postTemplate(post));
      } catch (error) {
        console.error('Error rendering post:', error, post);
      }
    });
  }
  

// Trigger fetching and displaying cupcake posts on page load
document.addEventListener('DOMContentLoaded', fetchCupcakePosts);