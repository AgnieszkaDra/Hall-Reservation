export class Container {
    private name: string;
    private children: HTMLElement[];
    private element: HTMLDivElement;

    constructor(name: string, children: HTMLElement[]) {
        this.name = name;
        this.children = children
         this.element = this.createContainer();
    }

    private createContainer(): HTMLDivElement {
        const container = document.createElement("div");
        container.className = `container__${this.name}`;
        container.classList.add(`${this.name}`)
        this.children.forEach(child => container.appendChild(child));
    
        return container;
    }

    render(): HTMLDivElement {
        return this.element;
    }
}