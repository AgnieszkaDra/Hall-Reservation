import createTitle from "../../typography/createTitle";
import { authWrapper } from "../../shared/authWrapper";
import { email, password } from "../../ui/fields/formFields";
import { InputField } from "../../ui/fields/InputField";

export class Login {
  private container: HTMLElement;
  protected fields: InputField[];

  constructor(fields: InputField[]) {
    this.container = document.querySelector(".forms__login") || document.createElement("div");
  
    this.fields = fields;
  }

  validateFields(): boolean {
    let isValid = true;
  
    this.fields.forEach((field) => {
      console.log(field)
      const value = field.getValue();
      const failedRules = field.rules?.filter(rule => !rule.validate(value)) || [];
  
      const errors = failedRules.map(rule => rule.getErrorMessage());
      console.log(errors)
  
      if (typeof field.showErrors === 'function') {
        field.showErrors(errors);
      }
  
      if (errors.length > 0) {
        isValid = false;
      }
    });
  
    return isValid;
  }

  generate() {
    this.container.innerHTML = "";

    const title = createTitle('h2', 'Logowanie', 'forms__title');
    const subtitle = createTitle('p', 'Podaj hasło, aby się zalogować', 'forms__paragraph');

    const form = document.createElement("form");
    form.className = "form";

    const loginButton = document.createElement('button');
    loginButton.className = 'form__button';
    loginButton.textContent = 'Zaloguj się';
    loginButton.type = 'submit';

    this.fields.forEach(field => {
      form.appendChild(field.createElement());
      
    });

    form.appendChild(loginButton)

   

    loginButton.addEventListener('click', (event) => {
      event.preventDefault();
      const isValid = this.validateFields();

      if (isValid) {
        console.log("All fields are valid! Submitting form...");
        // 🔥 Here you could call a submit function or show success message
      } else {
        console.warn("Some fields are invalid.");
      }
    });

    const registerTitle = createTitle('p', 'Nie masz konta? ', 'forms__paragraph');
    const registerLink = document.createElement('a');
    registerLink.className = 'form__link';
    registerLink.textContent = 'Zarejestruj się';
    registerLink.type = 'a';

    // registerButton.addEventListener('click', async () => {
    //   const containerLogin = document.querySelector('.forms__login');
    //   const containerForms = document.querySelector('.account__auth-form');

    //   if (containerLogin) {
    //     containerLogin.classList.toggle('block');
    //     const authForm = new AuthFormWrapper('register').render()
      
    //     if (containerForms) {
    //       containerForms.innerHTML = ''; 
    //       containerForms.appendChild(await authForm); 
    //     }
    //   }
    // });
    registerLink.addEventListener('click', async () => {
      const containerForms = document.querySelector('.account__auth-form');
    
      if (containerForms) {
        authWrapper.setType('register', [email, password]);
        // add there addField([email, password])
        console.log(authWrapper)
        const newContent = await authWrapper.render();
        containerForms.replaceWith(newContent); // clean replace
      }
    });
    registerTitle.appendChild(registerLink);

    this.container.append(title, subtitle, form, loginButton, registerTitle);
    return this.container;
  }

  render() {
    return this.generate();
  }
}

