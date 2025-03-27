export const CarouselButtons = (): { 
    prevBtnWrapper: HTMLDivElement; 
    nextBtnWrapper: HTMLDivElement 
} => {
  
    const prevBtnWrapper = document.createElement("div");
    prevBtnWrapper.classList.add("carousel__button-wrapper", "prevBtn");

    const prevBtn = document.createElement("button");
    prevBtn.className = "carousel__button prevBtn";
    prevBtn.id = "prevBtn";
    prevBtn.innerHTML = "&lt;";

    prevBtnWrapper.appendChild(prevBtn);

   
    const nextBtnWrapper = document.createElement("div");
    nextBtnWrapper.classList.add("carousel__button-wrapper", "nextBtn");

    const nextBtn = document.createElement("button");
    nextBtn.className = "carousel__button nextBtn";
    nextBtn.id = "nextBtn";
    nextBtn.innerHTML = "&gt;";

    nextBtnWrapper.appendChild(nextBtn);

    return { prevBtnWrapper, nextBtnWrapper };
}