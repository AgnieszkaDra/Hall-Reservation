import { Form } from "./Form";
import { InputField } from "../../ui/fields/InputField";
import { RequiredRule } from "../../fields/rules/RequiredRule";
import { PasswordRule } from "../../fields/rules/PasswordRule";
import { ButtonField } from "../../ui/ButtonField";
import { EmailRule } from "../../fields/rules/EmailRule";
import createTitle from "../../typography/createTitle";
import { Field } from "../../types/fields";
import { AuthFormWrapper } from "./AuthFormWrapper";
import Account from "../../panels/Account";

const required = new RequiredRule();
const passwordRule = new PasswordRule();
const emailRule = new EmailRule();

const email = new InputField(
  { type: "email", name: "emailUser", label: "E-mail" },
  [required, emailRule]
);

const password = new InputField(
  { type: "password", name: "password", label: "Hasło" },
  [required, passwordRule]
);

const button = new ButtonField(
  { type: "submit", name: "buttonSend", label: "Zaloguj się" }
);

export const LoginForm = new Form("login");
LoginForm.addField(email);
LoginForm.addField(password);
LoginForm.addField(button);

export class Login {
  private container: HTMLElement;
  protected fields: Field[];

  constructor(fields: Field[]) {
    this.container = document.querySelector(".forms__login") || document.createElement("div");
  
    this.fields = fields;
  }

  generate() {
    this.container.innerHTML = "";

    const title = createTitle('h2', 'Logowanie', 'forms__title');
    const subtitle = createTitle('p', 'Podaj hasło, aby się zalogować', 'forms__paragraph');

    const form = document.createElement("form");
    form.className = "form";

    this.fields.forEach(field => {
      form.appendChild(field.createElement());
    });

    const registerTitle = createTitle('p', 'Nie masz konta? ', 'forms__paragraph');
    const registerButton = document.createElement('button');
    registerButton.className = 'form__button--link';
    registerButton.textContent = 'Zarejestruj się';
    registerButton.type = 'button';

    registerButton.addEventListener('click', async () => {
      const containerLogin = document.querySelector('.forms__login');
    
      const containerForms = document.querySelector('.account');

      if (containerLogin) {
        containerLogin.classList.toggle('block');
        const authForm = new AuthFormWrapper('register');  
        const authFormRendered = authForm.render();
       
        if (containerForms) {
          containerForms.innerHTML = ''; 
          containerForms.appendChild(await authFormRendered); 
        }
      }
    });

    registerTitle.appendChild(registerButton);

    this.container.append(title, subtitle, form, registerTitle);
    return this.container;
  }

  render() {
    return this.generate();
  }
}

