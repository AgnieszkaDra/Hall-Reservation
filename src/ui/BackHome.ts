interface BackHomeOptions {
    text?: string;
    baseText?: string;
    className?: string;
    href?: string;
    headingLevel?: keyof HTMLElementTagNameMap; 
}

export function BackHome(options: BackHomeOptions = {}): HTMLElement {
    const {
        text = "",
        className = "backhome__link",
        href = "/index.html",
        headingLevel = "h5",
    } = options;

    const link = document.createElement("a");
    link.href = href;

    const heading = document.createElement(headingLevel);
    heading.classList.add(className)
    heading.textContent = text

    link.appendChild(heading);
    return link;
}