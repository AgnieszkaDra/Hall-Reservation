import { CarouselImage } from '../../types/Carousellmage';
import { CarouselButtons } from './helpers/CarouselButtons';
import { CarouselWrapper } from './helpers/CarouselWrapper';
import { createLinkWrapper } from './helpers/createLinkWrapper';
import { getImagePath } from './helpers/getImagePath';
import '../../styles/carousel.scss'

interface CarouselProps {
  images: CarouselImage[];
  variant: 'main' | 'products';
}

export const Carousel = async ({ images, variant }: CarouselProps): Promise<HTMLElement> => {
  console.log(images)
  const carousel = CarouselWrapper();
  const { prevBtnWrapper, nextBtnWrapper } = CarouselButtons();

  let currentSlide = 0;
  let interval = 5000;

  const linkWrapper = createLinkWrapper();
  const linkCarousel = linkWrapper.querySelector('.link__carousel') as HTMLAnchorElement;

  if (variant === 'main') carousel.appendChild(linkWrapper);

  carousel.append(prevBtnWrapper, nextBtnWrapper);

  const updateSlide = () => {
    carousel.style.backgroundImage = `url('${getImagePath(images[currentSlide], variant)}')`;
    carousel.style.backgroundSize = 'cover';

    if (variant === 'main') {
      linkCarousel.href = images[currentSlide].path;
      linkCarousel.textContent = images[currentSlide].name;
    }
  };

  const navigateSlide = (direction: 'prev' | 'next') => {
    currentSlide = direction === 'prev'
      ? (currentSlide === 0 ? images.length - 1 : currentSlide - 1)
      : (currentSlide === images.length - 1 ? 0 : currentSlide + 1);

    updateSlide();
    resetTimer();
  };

  prevBtnWrapper.addEventListener('click', () => navigateSlide('prev'));
  nextBtnWrapper.addEventListener('click', () => navigateSlide('next'));

  const goToNextSlide = () => navigateSlide('next');
  let slideTimer = setInterval(goToNextSlide, interval);
  
  const resetTimer = () => {
    clearInterval(slideTimer);
    slideTimer = setInterval(goToNextSlide, interval);
  };

  updateSlide();
  return carousel;
};

export default Carousel;




