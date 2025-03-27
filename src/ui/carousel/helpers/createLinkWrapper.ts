export const createLinkWrapper = (): HTMLElement => {
    const linkWrapper = document.createElement("div");
    linkWrapper.classList.add('link__wrapper');
  
    const linkCarousel = document.createElement("a");
    linkCarousel.classList.add('link__carousel');
  
    linkWrapper.appendChild(linkCarousel);
    return linkWrapper;
  };

