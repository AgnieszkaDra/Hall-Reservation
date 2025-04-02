import { InputField } from "../../ui/InputField";
import { ButtonSend } from "../../ui/ButtonSend";
import { RegisterForm } from "./RegisterForm";
import { AuthFormWrapper } from "./AuthFormWrapper";

export class Form {
    protected name: string;
    protected fields: InputField[] = [];
    protected formElement: HTMLFormElement;
    protected button: ButtonSend;

    constructor(name: string, fields: InputField[] = [], button: ButtonSend) {
        this.name = name;
        this.fields = fields;
        this.button = button;
        this.formElement = document.createElement("form");
        this.formElement.classList.add("form");
        this.formElement.setAttribute("novalidate", "");
        this.formElement.addEventListener("submit", (e) => this.handleSubmit(e));
    }

    addField(field: InputField): void {
        this.fields.push(field);
    }

    private async handleSubmit(event: Event): Promise<void> {
        event.preventDefault();
        this.validateFields(); // 1

        // if (await isValid === false) { // 2 
        //     this.afterSend();
        // }
    }

    private async validateFields(): Promise<boolean> {
        let isValid = true;
        const invalidFields: HTMLInputElement[] = [];

        for (const field of this.fields) {
            const inputElement = this.formElement.querySelector(`[name="${field.config.name}"]`) as HTMLInputElement;
            if (!inputElement) continue;

            let errorElement = this.formElement.querySelector(`[data-error-for="${field.config.name}"]`) as HTMLElement;
            if (!errorElement) {
                errorElement = document.createElement("p");
                errorElement.className = "error-message";
                errorElement.setAttribute("data-error-for", field.config.name);
                inputElement.insertAdjacentElement("afterend", errorElement);
            }

            errorElement.textContent = "";

            const isValidField = field.validate(inputElement.value);

            if (!isValidField) {
                isValid = false;
                errorElement.textContent = field.errors.join(", ");
                invalidFields.push(inputElement);
            }
        }

        return isValid;
    }

    private afterSend() {
        if (this.name === 'login') {
           alert('after login')
            const containerLogin = document.querySelector('.container__login')
            if (containerLogin) {
                containerLogin.classList.toggle('block')
            }

           const registerForm = new AuthFormWrapper('register')
           registerForm.render(); 

            const registerLogin = document.querySelector('.container__register')
            if (registerLogin) {
                registerLogin.classList.toggle('block')
            }


            const containerForms = document.querySelector('.container__forms')
            if (containerForms) {
                containerForms.innerHTML = ''; 
                //containerForms.appendChild(register); 
            }
        }
    }

    generate(): HTMLElement {
        this.formElement.innerHTML = "";

        this.fields.forEach(field => {
            const wrapper = document.createElement("div");
            wrapper.className = "input__wrapper";

            const input = document.createElement("input");
            input.type = field.config.type;
            input.name = field.config.name;
            input.className = "input";
            input.placeholder = field.config.label;

            if (field.config.required) {
                input.required = true;
            }

            const errorMessage = document.createElement("p");
            errorMessage.className = "error-message";
            errorMessage.setAttribute("data-error-for", field.config.name);

            wrapper.appendChild(input);
            wrapper.appendChild(errorMessage);
            this.formElement.appendChild(wrapper);
        });

        // Append the button
        this.formElement.appendChild(this.button.createElement());

        return this.formElement;
    }

    render(): HTMLElement {
        return this.generate();
    }
}