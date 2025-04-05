import { InputField } from "../../ui/InputField";
import { ButtonSend } from "../../ui/ButtonSend";
import { AuthFormWrapper } from "./AuthFormWrapper";
import { fetchOrganizers } from "../../api/fetchOrganizers";
import { Organizer } from "../../types/Organizer";
import loggedUser from "../../api/loggedUser";
import { navigate } from "../../router/router";
import { BackHome } from "../../ui/BackHome";
import { RegisterSuccess } from "./RegisterSuccess";
import { BACK_END_URL } from "../../constants/api";
import { User } from "../../types/User";
import { sendUserData } from "../../api/sendUser";

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
        alert('submit')
        console.log(this.name)
        event.preventDefault();
        const isValid = await this.validateFields();
        if (isValid && this.name === "login") {
            await this.afterValidate();
        }
        if (isValid && this.name === "register") {
            this.showRegisterSuccess();
        }
    }

    private async validateFields(): Promise<boolean> {
        let isValid = true;

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
            }
        }

        return isValid;
    }

    protected async afterValidate(): Promise<void> {
        const emailInput = this.formElement.querySelector('input[name="email"]') as HTMLInputElement;
        const emailValue = emailInput?.value || "";

        try {
            const organizers = await fetchOrganizers();
            const existingOrganizer = organizers.find((organizer: Organizer) => organizer.email === emailValue);

            if (existingOrganizer) {
                const updatedUser = await loggedUser(existingOrganizer);
                localStorage.setItem("currentUser", JSON.stringify(updatedUser));
                window.location.href = "/";
                return;
            }

            this.showRegisterForm();
           
            const formData: Record<string, string | number> = {};
            this.fields.forEach((field) => {
                const input = this.formElement.querySelector(`[name="${field.config.name}"]`) as HTMLInputElement;
                if (input) {
                  formData[field.config.name] = input.value;
                }
              });

              try {
                await sendUserData(formData);
              } catch (err) {
                console.error("Registration Error:", err);
              }
    

        } catch (error) {
            console.error("Error validating email existence:", error);
        }
    }

    protected async showRegisterForm(): Promise<void> {
        
        const containerLogin = document.querySelector('.container__login');
        if (containerLogin) {
            containerLogin.classList.toggle('block');
        }

        const wrapperContainer = document.querySelector('.container');
        const authFormWrapper = new AuthFormWrapper('register');
        if (wrapperContainer) {
            wrapperContainer.innerHTML = '';
            const registerFormElement = await authFormWrapper.render();
            wrapperContainer.appendChild(registerFormElement);
        }
    }

    protected async showRegisterSuccess(): Promise<void> {
        
        const containerLogin = document.querySelector('.container__login');
        if (containerLogin) {
            containerLogin.classList.toggle('block');
        }

        const wrapperContainer = document.querySelector('.container');
        if (wrapperContainer) {
            wrapperContainer.innerHTML = '';
            const registerSuccessElement = RegisterSuccess.render(); 
            wrapperContainer.appendChild(registerSuccessElement);
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

        this.formElement.appendChild(this.button.createElement());

        return this.formElement;
    }

    render(): HTMLElement {
        return this.generate();
    }
}