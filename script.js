// script.js
document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carousel-container');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    
    let currentIndex = 0;
    let timer;
    const totalSlides = slides.length;

    function getItemsPerView() {
      return 1;
    }

    function updateCarousel() {
      const itemsPerView = getItemsPerView();
      // Ensure we don't slide past the end
      if (currentIndex > totalSlides - itemsPerView) {
        currentIndex = Math.max(0, totalSlides - itemsPerView);
      }
      
      const slideWidth = 100 / itemsPerView;
      track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    }

    function nextSlide() {
      const itemsPerView = getItemsPerView();
      if (currentIndex >= totalSlides - itemsPerView) {
        currentIndex = 0; // wrap around
      } else {
        currentIndex++;
      }
      updateCarousel();
    }

    function prevSlide() {
      const itemsPerView = getItemsPerView();
      if (currentIndex <= 0) {
        currentIndex = totalSlides - itemsPerView; // wrap around
      } else {
        currentIndex--;
      }
      updateCarousel();
    }

    function startTimer() {
      stopTimer();
      timer = setInterval(nextSlide, 5000);
    }

    function stopTimer() {
      if (timer) {
        clearInterval(timer);
      }
    }

    function resetTimer() {
      startTimer(); // This will clear and restart
    }

    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetTimer();
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetTimer();
    });

    window.addEventListener('resize', updateCarousel);

    // Initial update and start timer
    updateCarousel();
    startTimer();
  });
});
