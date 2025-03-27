import { Form } from "./Form";
import { SelectField } from "../SelectField";

export function LoginWrapper() {
    const container = document.createElement("div");
    container.className = "container";
    const form = new Form();

    const genderField = new SelectField({
        name: "organizer",
        label: "Osoba odpowiedzialna",
        options: ["Jan Kowalski", "Ola Kowalska"],
    });

    form.addField(genderField);

    const containerForms = document.createElement("div");
    containerForms.className = "container__forms";

    const wrapper = document.createElement("div");
    form.generate(wrapper);

  return wrapper; 
  
}