//import '../../styles/header.scss';
import { AccountSection } from '../sections/AccountSection'; 

export class Header {
  element: HTMLElement;

  constructor() {
    const header = document.createElement("header");
    this.element = header;
  }

  async addAccountSection() {
    const account = await AccountSection();
    this.element.appendChild(account);
  }

  async render() {
    await this.addAccountSection(); 
    return this.element;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}

export default Header;