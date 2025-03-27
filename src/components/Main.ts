import { Halls } from "./Halls";

export const Main = async () => {
  const main = document.createElement("main");
  main.classList.add("main");

  const hallsSection = await Halls(); 
  main.append(hallsSection);

  return main;
};