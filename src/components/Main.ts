import { Halls } from "./Halls";

// export const Main = async ('halls') => {
//   const main = document.createElement("main");
//   main.classList.add("main");

//   const hallsSection = await Halls(); 
//   main.append(hallsSection);

//   return main;
// };

export const Main = (...children: (HTMLElement | Promise<HTMLElement>)[]) => {
  const main = document.createElement("main");
  main.classList.add("main");

  children.forEach(async (child) => {
    const resolvedChild = await child; 
    main.append(resolvedChild);
  });

  return main;
};