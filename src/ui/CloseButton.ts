export class CloseButton {
    private button: HTMLButtonElement;
  
    constructor(private modalOverlay: HTMLElement) {
      this.button = document.createElement("button");
      this.button.textContent = "✖";
      this.button.classList.add("close-button");
      this.addEventListeners();
    }
  
    private addEventListeners() {
      this.button.addEventListener("click", () => {
        this.modalOverlay.classList.remove("visible");
      });
    }
  
    public render(): HTMLButtonElement {
      return this.button;
    }
  }
  
  export default CloseButton;