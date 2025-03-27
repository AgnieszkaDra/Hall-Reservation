import { CarouselImage } from "../../../types/Carousellmage";

export const CarouselImages = (imagesCarousel: string[]): CarouselImage[] => {
    return imagesCarousel.map(image => ({
      imageBackground: image,
      name: image,
      path: `/assets/${image}.jpg`
    }));
  }