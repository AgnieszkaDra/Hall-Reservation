import { Form } from "./Form";
import { SelectField } from "./SelectField";

export const Main = (): HTMLElement => {
  const main = document.createElement("main");
  main.classList.add("main");

  const container = document.createElement('div');
  container.className = 'container';

  const form = new Form(); 

  const genderField = new SelectField(
    { name: "organizer", label: "Osoba odpowiedzialna ", options: ["Jan Kowalski", "Ola Kowalska"] },
  );
  form.addField(genderField);

  const containerForms = document.createElement('div');
  containerForms.className = 'container__forms';

  container.append(containerForms)

  form.generate(containerForms);

  main.append(container);

  return main;
};

export default Main;