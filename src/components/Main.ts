import { Form } from "./Form";
import { SelectField } from "./SelectField";

export const Main = (): HTMLElement => {
  const main = document.createElement("main");
  main.classList.add("main");

  const form = new Form(); 

  const genderField = new SelectField(
    { name: "organizer", label: "Osoba odpowiedzialna ", options: ["Jan Kowalski", "Ola Kowalska"] },
  );
  form.addField(genderField);

  const formContainer = document.createElement("div");
  formContainer.classList.add("form__wrapper");
  form.generate(formContainer);

  main.append(formContainer);

  return main;
};

export default Main;