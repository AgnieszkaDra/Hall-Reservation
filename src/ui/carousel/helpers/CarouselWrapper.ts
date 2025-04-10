export const CarouselWrapper = (): HTMLElement => {
    const carousel = document.createElement("div");
    carousel.classList.add('carousel');
    carousel.setAttribute('id', 'carousel');
    carousel.setAttribute('aria-label', 'carousel');
    return carousel;
  };