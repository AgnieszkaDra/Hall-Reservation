const createTitle = (
  kind: 'h1' | 'h2' | 'h3' | 'h4' | 'h5',
  text: string,
  className: string
): HTMLHeadingElement => {
  const title = document.createElement(kind);
  title.className = className;
  title.textContent = text;
  return title;
};

export default createTitle;