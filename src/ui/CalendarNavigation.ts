export class CalendarNavigation {
    private prevButton: HTMLButtonElement;
    private nextButton: HTMLButtonElement;
  
    constructor() {
      this.prevButton = document.createElement("button");
      this.prevButton.textContent = "‹";
      this.prevButton.classList.add("calendar-nav", "prev-btn");
  
      this.nextButton = document.createElement("button");
      this.nextButton.textContent = "›";
      this.nextButton.classList.add("calendar-nav", "next-btn");
    }
  
    public render(): { prevButton: HTMLButtonElement; nextButton: HTMLButtonElement } {
      return {
        prevButton: this.prevButton,
        nextButton: this.nextButton,
      };
    }
  }
  
  export default CalendarNavigation;