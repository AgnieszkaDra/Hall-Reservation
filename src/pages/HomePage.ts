import HeaderMain from "../components/header/HeaderMain";
import { Main } from "../components/Main";

export const HomePage = async () => {
    const app = document.querySelector("#app");
  
    const header = await HeaderMain()
    const main = Main();

    app?.append(header, await main);
    return app;

};

export default HomePage;
