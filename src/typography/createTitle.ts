// class Title {
//   element: HTMLHeadingElement;

//   constructor(kind: 'h1' | 'h2' | 'h3' | 'h4' | 'h5', text: string, className: string) {
//     this.element = document.createElement(kind);
//     this.element.className = className;
//     this.element.textContent = text;
//   }

//   render(): HTMLHeadingElement {
//     return this.element;
//   }
// }

// export default Title;

const createTitle = (
  kind: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p',
  text: string,
  className: string
): HTMLHeadingElement => {
  const title = document.createElement(kind);
  title.className = className;
  title.textContent = text;
  return title;
};

export default createTitle;