
import createTitle from "../../typography/createTitle";
import { Field } from "../../types/fields";
import { authWrapper } from "../../shared/authWrapper";
import { email, password } from "../../ui/fields/formFields";
import { InputField } from "../../ui/fields/InputField";

interface FieldGroup {
  name: string;
  fields: Field[];
}

export class Register {
  private container: HTMLElement;
  protected fields: InputField[];

  constructor(fields: InputField[]) {
    this.container = document.querySelector(".forms__register") || document.createElement("div");
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

  async generate() {
    this.container.innerHTML = "";

    if (this.container) {
      this.container.classList.add('block');
    }

    const title = createTitle('h2', 'Rejestracja', 'forms__title');
    const subtitle = createTitle('p', 'Wypełnij dane, aby się zarejestrować', 'forms__paragraph');

    const form = document.createElement("form");
    form.className = "form";

    this.fields.forEach(field => {
      form.appendChild(field.createElement());
    });

    const registerButton = document.createElement('button');
    registerButton.className = 'form__button';
    registerButton.textContent = 'Zarejestruj się';
    registerButton.type = 'submit';

    registerButton.addEventListener('click', (event) => {
      event.preventDefault();
      const isValid = this.validateFields();

      if (isValid) {
        console.log("All fields are valid! Submitting form...");
        // 🔥 Here you could call a submit function or show success message
      } else {
        console.warn("Some fields are invalid.");
      }
    });

    const registerParagraph = createTitle('p', 'Masz już konto? ', 'container__paragraph');
    const loginLink = document.createElement('a');
    loginLink.className = 'form__link';
    loginLink.textContent = 'Zaloguj się';
    
    loginLink.addEventListener('click', async () => {
      const containerForms = document.querySelector('.account__auth-form');

      if (containerForms) {
         authWrapper.setType('login', [email, password]);
        //authWrapper.setType('login');
        const newContent = await authWrapper.render();
        containerForms.replaceWith(newContent);
      }
    });

    registerParagraph.appendChild(loginLink);

    form.appendChild(registerButton);
    this.container.append(title, subtitle, form, registerParagraph);
    return this.container;
  }

  render() {
    return this.generate();
  }
}

