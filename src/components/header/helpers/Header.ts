import '../../../styles/header.scss';

interface HeaderProps {
  backgroundColor?: string;
  children?: HTMLElement[];
  className?: string;
}

export class Header {
  element: HTMLElement;

  constructor({
    backgroundColor = "transparent",
    children = [],
    className = '',
  }: HeaderProps) {
    const header = document.createElement("header");

    header.className = `header ${className}`.trim();
    header.style.backgroundColor = backgroundColor;

    children.forEach((child) => header.appendChild(child));

    this.element = header;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}

export default Header;


// import '../../../styles/header.scss'

// interface HeaderProps {
//     backgroundColor?: string;
//     children?: HTMLElement[];
//     className?: string;
// }

// export const Header = ({ backgroundColor = "transparent", children = [], className= '' }: HeaderProps): HTMLElement => { 
//     const header = document.createElement("header");
//     header.className = 'header';
//     header.classList.add(className);
//     header.style.backgroundColor = backgroundColor;

//     children.forEach(child => {
//         header.appendChild(child);
//     });

//     return header;
// };

// export default Header;
