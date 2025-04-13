import { Form } from "./Form";
import { InputField } from "../../ui/fields/InputField";
import { SelectField } from "../../ui/fields/SelectField";
import { ButtonField } from "../../ui/ButtonField";
import { RequiredRule } from "../../fields/rules/RequiredRule";
import { LengthRule } from "../../fields/rules/LengthRule";
import { fetchCommunions } from "../../api/fetchCommunions";
import createTitle from "../../typography/createTitle";
import { Field } from "../../types/fields";
import { AuthFormWrapper } from "./AuthFormWrapper";

const required = new RequiredRule();
const lengthRule = (amount: number) => new LengthRule(amount);

const nameField = new InputField(
  { type: "text", name: "name", label: "Imię i Nazwisko" },
  [required, lengthRule(3)]
);

const cityField = new InputField(
  { type: "text", name: "miasto", label: "Miasto" },
  [required, lengthRule(4)]
);

const buttonRegister = new ButtonField(
  { type: "submit", name: "registerButton", label: "Zarejestruj się" }
);

export const RegisterForm = async () => {
  const communionOptions = await fetchCommunions();

  const communionField = new SelectField({
    name: "communion",
    label: "Wybierz wspólnotę",
    type: "select",
    options: communionOptions,
  });

  const registerForm = new Form("register");
  registerForm.addField(nameField);
  registerForm.addField(cityField);
  registerForm.addField(communionField);
  registerForm.addField(buttonRegister);

  return registerForm;
};

export class Register {
  private container: HTMLElement;
  protected fields: Field[];

  constructor(fields: Field[]) {
    this.container = document.querySelector(".forms__register") || document.createElement("div");
   //this.container.className = "forms__register block";
    this.fields = fields;
  }

  generate() {
    this.container.innerHTML = "";
    console.log(this.container)
     if (this.container) {
      this.container.classList.add('block');
    }

    const title = createTitle('h2', 'Rejestracja', 'container__title');
    const subtitle = createTitle('p', 'Wypełnij dane, aby się zarejestrować', 'container__paragraph');

    const form = document.createElement("form");
    form.className = "form";

    this.fields.forEach(field => {
      form.appendChild(field.createElement());
    });
  
    const registerButton = document.createElement('button');
    registerButton.className = 'form__foot__link';
    registerButton.textContent = 'Zarejestruj się';
    registerButton.type = 'submit';

    registerButton.addEventListener('click', (event) => {
      event.preventDefault();
      console.log("Registering with data...");
    });

    const registerTitle = createTitle('p', 'Masz już konto? ', 'container__paragraph');
    const loginButton = document.createElement('button');
    loginButton.className = 'form__foot__link';
    loginButton.textContent = 'Zaloguj się';
    loginButton.type = 'button';

    loginButton.addEventListener('click', async () => {
      
      const containerRegister = document.querySelector('.forms__register');
      const containerForms = document.querySelector('.account');
        if (containerRegister) {
            containerRegister.classList.toggle('block');
            const authForm = new AuthFormWrapper('login');  
            const authFormLogin = authForm.render();
              
              if (containerForms) {
                containerForms.innerHTML = ''; 
                containerForms.appendChild(await authFormLogin); 
              }
            }
    });

    registerTitle.appendChild(loginButton);

    this.container.append(title, subtitle, form, registerTitle);
    return this.container;
  }

  render() {
    return this.generate();
  }
}