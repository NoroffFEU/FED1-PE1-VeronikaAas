import { createPost } from "../post/create.mjs";

export function setCreatePostListener () {
    const form = document.querySelector("#createPost");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault()
    
            const form = event.target;
            const formData = new FormData(form);
            const post = Object.fromEntries(formData.entries())

            const tagsAsArray = stringToArray(post.tags);
            const mediaAsObject = setMediaObject(post.mediaURL);

            const postData = {
                title: post.title,
                media: mediaAsObject,
                body: post.body,
                tags: tagsAsArray
            }
    
            createPost(postData)
        })
    }
}

export function stringToArray(inputString) {
  return inputString.trim().split(",").map(item => item.trim());
}

export function setMediaObject(stringUrl) {
 const media = {
    url: stringUrl,
    alt: ""
  }
  return media; 
}