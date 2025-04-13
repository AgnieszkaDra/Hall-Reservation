import { MainOptions } from "../types/interfaces/components";

export async function Main({ className = '', children = [] }: MainOptions): Promise<HTMLElement> {
  const main = document.createElement('main');
  main.classList.add('main');

  const container = document.createElement("div");
  container.className = "container";
  if (className) {
    container.classList.add(className);
  }

  const resolvedChildren = await Promise.all(children);
  resolvedChildren.forEach(child => container.appendChild(child));

  main.appendChild(container); 

  return main;
}