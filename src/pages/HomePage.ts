import { Halls } from "../components/Halls";
import Header from "../components/header/helpers/Header";
import { Main } from "../components/Main";
import { AccountSection } from "../components/sections/AccountSection";
import { getCSSVariable } from "../utils/getCSSVariable";

export const HomePage = async () => {
    const app = document.querySelector("#app");

    const account = await AccountSection();

    const headerInstance = new Header({
      backgroundColor: getCSSVariable("--color-turcoise"),
      children: [account],
      className: 'header__main',
    });
  
    const header = headerInstance.getElement();

    const hallsSection = await Halls(); 
    const main = Main(hallsSection);

    app?.append(header, main);
    return app;

};

export default HomePage;
