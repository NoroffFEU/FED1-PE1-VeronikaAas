import { API_BASE_URL, API_ENDPOINT_BLOG_POSTS, API_ENDPOINT_NAME } from "../js/constants.mjs";

document.addEventListener('DOMContentLoaded', async () => {
    const feedContainer = document.getElementById('adminContainer');
    
    try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_BLOG_POSTS}${API_ENDPOINT_NAME}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();

        if (responseData && Array.isArray(responseData.data)) {
            const posts = responseData.data;
            // Generer HTML for hvert innlegg
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>Author: ${post.author.name}</p>
                    ${post.media.url ? `<img src="${post.media.url}" alt="">` : ''}
                    <p>Tags: ${post.tags.join(', ')}</p>
                    <button class="edit-btn" data-id="${post.id}">Edit</button>
                    <button class="delete-btn" data-id="${post.id}">Delete</button>`;
                feedContainer.appendChild(postElement);
            });

            // Legg til event listeners for edit og delete knappene
            document.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    const postId = event.target.getAttribute('data-id');
                    window.location.href = `../post/edit.html?postId=${postId}`;
                });
            });

            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', async (event) => {
                    const postId = event.target.getAttribute('data-id');
                    const confirmed = confirm('Are you sure you want to delete this post?');

                    if (confirmed) {
                        const deleteResponse = await fetch(`${API_BASE_URL}${API_ENDPOINT_BLOG_POSTS}${API_ENDPOINT_NAME}/${postId}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('key')}`
                            }
                        });

                        if (deleteResponse.ok) {
                            alert('Post deleted');
                            window.location.reload(); // Reload siden for å oppdatere listen
                        } else {
                            alert('Failed to delete post');
                        }
                    }
                });
            });
        } else {
            console.error('Data is not an array or does not exist in the expected format:', responseData);
        }
    } catch (error) {
        console.error('Failed to fetch posts:', error);
    }
});

