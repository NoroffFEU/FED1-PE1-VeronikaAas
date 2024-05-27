import { authFetch } from "../js/api/authFetch.mjs";
import { API_BASE_URL, API_ENDPOINT_BLOG_POSTS, API_ENDPOINT_NAME } from "../js/constants.mjs";

// Extract query parameter 'id' from the URL
const parameterString = window.location.search;
const searchParameters = new URLSearchParams(parameterString);
const postId = searchParameters.get("id");

// Function to fetch and display single post data
const fetchAndDisplayPost = async (postId) => {
  if (!postId) {
    console.error("No 'id' query parameter provided in the URL.");
    document.querySelector(".error-message").innerText = "Missing ID parameter in the URL.";
    return;
  }

  try {
    const response = await authFetch(`${API_BASE_URL}${API_ENDPOINT_BLOG_POSTS}${API_ENDPOINT_NAME}/${postId}`);
    const data = await response.json();

    if (data && data.data) {
      const post = data.data;

      const singlePostContainer = document.querySelector(".singlePostContainer");

      const postWrapper = document.createElement('div');
      postWrapper.classList.add('post');

      const heading = document.createElement('h1');
      heading.textContent = post.title || "No title";

      const author = document.createElement('p');
      author.textContent = `By: ${post.author.name || "Unknown author"}`;

      const mediaContainer = document.createElement('div');
      mediaContainer.classList.add('media-container');
      if (post.media && post.media.url) {
        const media = document.createElement('img');
        media.setAttribute('src', post.media.url);
        media.setAttribute('alt', post.media.alt || 'Post image');
        mediaContainer.appendChild(media);
      }

      const body = document.createElement('p');
      body.innerHTML = post.body || "No body"; 

      const tagsContainer = document.createElement('div');
      tagsContainer.classList.add('tagsContainer');
      if (post.tags) {
        post.tags.forEach(tag => {
          const tagElement = document.createElement('span');
          tagElement.classList.add('tag');
          tagElement.textContent = tag;
          tagsContainer.appendChild(tagElement);
        });
      }

      postWrapper.append(heading, author, mediaContainer, body, tagsContainer);
      singlePostContainer.appendChild(postWrapper);
    } else {
      console.error('Data is missing in the response:', data);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchAndDisplayPost(postId);