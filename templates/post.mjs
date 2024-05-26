import { authFetch } from "../js/api/authFetch.mjs";
import { API_BASE_URL, API_ENDPOINT_BLOG_POSTS, API_ENDPOINT_NAME } from "../js/constants.mjs";
import { getPosts } from "../js/post/read.mjs";

// Extract query parameter 'id' from the URL
const parameterString = window.location.search;
const searchParameters = new URLSearchParams(parameterString);
const id = searchParameters.get("id");

// Function to fetch and display single post data
const fetchAndDisplayPost = async (postId) => {
  if (!postId) {
    console.error("No 'id' query parameter provided in the URL.");
    document.querySelector(".error-message").innerText = "Missing ID parameter in the URL.";
    return;
  }

  try {
    const fetchInfo = await authFetch(`${API_BASE_URL}${API_ENDPOINT_BLOG_POSTS}${API_ENDPOINT_NAME}/${postId}`);
    console.log(fetchInfo);

    if (fetchInfo.data) {
      const mediaURL = document.querySelector(".mediaURL");
      const username = document.querySelector(".username");
      const ingredients = document.getElementById("ingredients");
      const direction = document.getElementById("direction");

      if (fetchInfo.data.mediaURL) {
        mediaURL.src = fetchInfo.data.mediaURL.url;
        mediaURL.setAttribute("alt", fetchInfo.data.mediaURL.alt);
      }

      username.innerText = fetchInfo.data.title || "No title";
      ingredients.innerText = fetchInfo.data.body || "No ingredients";
      direction.innerText = fetchInfo.data.body || "No direction";
    } else {
      console.error('Data is missing in the response:', fetchInfo);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Function to render list of posts
export async function renderPosts() {
  try {
    const postList = await getPosts();
    const posts = postList.data;
    renderPostsTemplate(posts);
  } catch (error) {
    console.error('Error rendering posts:', error);
  }
}

// Function to render a single post template
export function postTemplate(postData) {
  const postWrapper = document.createElement('div');
  postWrapper.classList.add('post');

  const heading = document.createElement('h3');
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

renderPosts();