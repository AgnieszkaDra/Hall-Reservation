interface LoginLinkOptions {
    text?: string;
    icon?: string;
    className?: string;
    href?: string;
    headingLevel?: keyof HTMLElementTagNameMap;
}

export function LoginLink(options: LoginLinkOptions = {}): HTMLElement {
    const {
        text = "",
        icon,
        className = "link__login--icon",
        href = "/moje-konto",
        headingLevel = "h5",
    } = options;

    const link = document.createElement("a");
    link.href = href;
    link.classList.add("link__login--icon");

    const heading = document.createElement(headingLevel);
    heading.className = className;
    heading.textContent = text;

    if (icon) {
        const iconElement = document.createElement("span");
        iconElement.className = icon;
        heading.prepend(iconElement); 
    }

    link.appendChild(heading);
    return link;
}