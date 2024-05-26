
export function initateCarousel(){

    const slides = document.querySelectorAll(".carousel-cards");
    const previous = document.querySelector(".previous");
    const next = document.querySelector(".next");
    let slideIndex = 0;
    let intervalId = null;
    
    document.addEventListener("DOMContentLoaded", initializeSlider);
    previous.addEventListener("click", prevSlide);
    next.addEventListener("click", nextSlide);
    
    function initializeSlider(){
        if(slides.length > 0){
            slides[slideIndex].classList.add("displaySlide");
            intervalId = setInterval(nextSlide, 5000);
        }
    }
    
    function showSlide(index){
        if(index >= slides.length){
            slideIndex = 0;
        }
        else if(index < 0){
            slideIndex = slides.length - 1;
        }
    
        slides.forEach(slide => {
            slide.classList.remove("visible");
            slide.classList.add("hidden");
          });
          slides[slideIndex].classList.remove("hidden");
          slides[slideIndex].classList.add("visible");
    }
    
    function prevSlide(){
        clearInterval(intervalId);
        slideIndex--;
        showSlide(slideIndex);
    }
    
    function nextSlide(){
        slideIndex++;
        showSlide(slideIndex);
    }
}