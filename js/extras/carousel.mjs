import { authFetch } from "../api/authFetch.mjs";
import { API_BASE_URL, API_ENDPOINT_BLOG_POSTS, API_ENDPOINT_NAME } from "../constants.mjs";
import { getPosts } from "../post/read.mjs";

document.addEventListener('DOMContentLoaded', (event) => {
  // Funksjon for å lage karusell-elementer
  const createCarouselItem = (postData) => {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');

    const image = document.createElement('img');
    image.src = postData.media.url;
    image.alt = postData.media.alt || 'Post image';

    const title = document.createElement('h3');
    title.textContent = postData.title;

    carouselItem.append(image, title);

    carouselItem.addEventListener('click', () => {
      window.location.href = `post/index.html?id=${postData.id}`;
    });

    return carouselItem;
  };

  // Funksjon for å oppdatere karusellen med innlegg
  const updateCarousel = (posts) => {
    const carouselInner = document.querySelector('.carousel-inner');
    if (!carouselInner) {
      console.error("Element with class 'carousel-inner' not found.");
      return;
    }

    carouselInner.innerHTML = '';
    posts.forEach(post => {
      carouselInner.appendChild(createCarouselItem(post));
    });
  };

  // Funksjon for å hente de tre siste innleggene og oppdatere karusellen
  const loadCarousel = async () => {
    try {
      const postList = await getPosts();
      const posts = postList.data.slice(0, 3); // Henter de tre siste innleggene
      updateCarousel(posts);
    } catch (error) {
      console.error('Error loading carousel posts:', error);
    }
  };

  loadCarousel();

  // Funksjon for å håndtere karusell navigasjon med looping
  const handleCarouselNavigation = (direction) => {
    const carouselInner = document.querySelector('.carousel-inner');
    const items = carouselInner.querySelectorAll('.carousel-item');
    const itemWidth = items[0].offsetWidth;
    const currentTransform = getComputedStyle(carouselInner).transform;
    
    let currentTranslateX = 0;
    
    if (currentTransform !== 'none') {
      const matrixValues = currentTransform.match(/matrix.*\((.+)\)/);
      
      if (matrixValues) {
        currentTranslateX = parseFloat(matrixValues[1].split(', ')[4]);
      } else {
        console.error('Transform matrix values not found:', currentTransform);
      }
    }

    if (direction === 'next') {
      currentTranslateX -= itemWidth;
      if (currentTranslateX < -(itemWidth * (items.length - 1))) {
        currentTranslateX = 0; // Loop back to first item
      }
    } else {
      currentTranslateX += itemWidth;
      if (currentTranslateX > 0) {
        currentTranslateX = -(itemWidth * (items.length - 1)); // Loop to last item
      }
    }

    carouselInner.style.transform = `translateX(${currentTranslateX}px)`;
  };

  document.querySelector('.carousel-control.prev').addEventListener('click', () => {
    handleCarouselNavigation('prev');
  });

  document.querySelector('.carousel-control.next').addEventListener('click', () => {
    handleCarouselNavigation('next');
  });
});