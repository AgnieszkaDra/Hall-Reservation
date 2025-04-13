import { Halls } from "../components/Halls";
import { Main } from "../components/Main";

export const HomePage = async () => {
  const hallsSection = await Halls();
  
  const main = await Main({
    children: [hallsSection]
  });

  return main;
};

export default HomePage;