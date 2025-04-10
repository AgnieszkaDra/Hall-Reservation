export const createLink = (hallId: string, text: string, className: string): HTMLAnchorElement => {
    const link = document.createElement("a");
    link.href = `/hall/${hallId}`;
    link.textContent = text;
    link.classList.add(className);
    return link;
  };