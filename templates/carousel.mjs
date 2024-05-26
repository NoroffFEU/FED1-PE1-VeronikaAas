import { getPosts } from "../api/posts/read.mjs";
import { initateCarousel } from "../js/extras/carousel.mjs";

export function postCarouselTemplate(postData, index) {
    const title = document.createElement("h3");
    title.innerText = postData.title;

    const subheading = document.createElement("div");
    subheading.classList.add("post-subheading"); 

    const date = document.createElement("p");
    const formattedDate = formatDate(postData.created);
    date.innerText = `${formattedDate} /`;

    const author = document.createElement("p");
    author.innerText = `${postData.author.name}`;

    const editLink = viewEditLink(postData); 

    subheading.append(date, author, editLink);

    const heading = document.createElement("div");
    heading.classList.add("post-heading");
    heading.append(title, subheading);

    const mediaContainer = document.createElement("div");
    mediaContainer.classList.add("media-container");
    const media = document.createElement("img");
    media.setAttribute("src", postData.media.url);
    mediaContainer.appendChild(media);

    const readMoreButton = document.createElement("a");
    readMoreButton.setAttribute("href", `../../post/index.html?id=${postData.id}`);
    readMoreButton.classList.add("cta");
    readMoreButton.classList.add("cta-bigger");
    readMoreButton.innerText = "Read more";

    const post = document.createElement("div");
    post.classList.add("carousel-cards");
    post.classList.add("card");
    if (index === 0) {
        post.classList.add("visible");
      } else {
        post.classList.add("hidden");
      }
    post.append(heading, mediaContainer, readMoreButton);
    
    const carouselSlides = document.querySelector(".carousel-slides");
    carouselSlides.append(post);

    return carouselSlides;
}


export function renderPostCarouselTemplate(carouselSlides){
    const latestPostsCarousel = document.querySelector(".carousel-container");
    
    const sortedPosts = carouselSlides.sort((a, b) => new Date(b.created) - new Date(a.created));
    const latestPosts = sortedPosts.slice(0, 3);

    latestPosts.forEach((carouselSlides, index) => {
       
        latestPostsCarousel.appendChild(postCarouselTemplate(carouselSlides, index)); 
    });
}


export async function renderPostCarousel() {
      const postList = await getPosts();
      const posts = postList.data;
      renderPostCarouselTemplate(posts);
      initateCarousel();
}