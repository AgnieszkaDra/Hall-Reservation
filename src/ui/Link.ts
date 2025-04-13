export const Link = (
    href: string,
    text: string,
    classNames: string[] = []
  ): HTMLAnchorElement => {
    const link = document.createElement("a");
    link.href = href;
    link.textContent = text;
  
    classNames.forEach(className => link.classList.add(className));
  
    return link;
  };