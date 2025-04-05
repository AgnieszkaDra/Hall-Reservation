import { InputField } from "../../ui/InputField";
import { ButtonSend } from "../../ui/ButtonSend";
import { AuthFormWrapper } from "./AuthFormWrapper";
import { fetchData } from "../../api/fetchData";
import { Organizer } from "../../types/Organizer";
import loggedUser from "../../api/loggedUser";
import { RegisterSuccess } from "./RegisterSuccess";
import registerUser from "../../api/registerUser";
import { SelectField } from "../SelectField";

export class Form {
    protected name: string;
    protected fields: (InputField | SelectField)[] = [];
    protected formElement: HTMLFormElement;
    protected button: ButtonSend;
    protected formData: Record<string, string | number> = {};

    constructor(name: string, fields: (InputField | SelectField)[] = [], button: ButtonSend) {
        this.name = name;
        this.fields = fields;
        this.button = button;
        this.formElement = document.createElement("form");
        this.formElement.classList.add("form");
        this.formElement.setAttribute("novalidate", "");
        this.formElement.addEventListener("submit", (e) => this.handleSubmit(e));
    }

    addField(field: InputField | SelectField): void {
        this.fields.push(field);
    }

    private async handleSubmit(event: Event): Promise<void> {
        event.preventDefault();
        const isValid = await this.validateFields();

        if (isValid) {
            this.fields.forEach((field) => {
                const input = this.formElement.querySelector(`[name="${field.config.name}"]`) as HTMLInputElement;
                if (input) {
                    this.formData[field.config.name] = input.value;
                }
            });
        }

        if (isValid && this.name === "login") {
            await this.afterValidate();
        }

        if (isValid && this.name === "register") {
            const email = localStorage.getItem("actualEmail");
            if (email) {
                this.formData["email"] = JSON.parse(email);
                const createdUser = await registerUser(this.formData);
                console.log(createdUser);
            }
            this.showRegisterSuccess();
        }
    }

    private async validateFields(): Promise<boolean> {
        let isValid = true;

        for (const field of this.fields) {
            const inputElement = this.formElement.querySelector(`[name="${field.config.name}"]`) as HTMLInputElement | HTMLSelectElement;
            if (!inputElement) continue;

            let errorElement = this.formElement.querySelector(`[data-error-for="${field.config.name}"]`) as HTMLElement;
            if (!errorElement) {
                errorElement = document.createElement("p");
                errorElement.className = "error-message";
                errorElement.setAttribute("data-error-for", field.config.name);
                inputElement.insertAdjacentElement("afterend", errorElement);
            }

            errorElement.textContent = "";
            let isValidField = true;

            if ('validate' in field && typeof field.validate === 'function') {
                isValidField = field.validate(inputElement.value);
            }

            if (!isValidField) {
                isValid = false;
                if ('errors' in field && Array.isArray(field.errors)) {
                    errorElement.textContent = field.errors.join(", ");
                }
            }
        }

        return isValid;
    }

    protected async afterValidate(): Promise<void> {
        const emailInput = this.formElement.querySelector('input[name="email"]') as HTMLInputElement;
        const emailValue = emailInput?.value.trim() || "";

        try {
            const organizers = await fetchData('organizers');
            const existingOrganizer = organizers.find((organizer: Organizer) => organizer.email === emailValue);

            if (existingOrganizer) {
                const updatedUser = await loggedUser(existingOrganizer);
                localStorage.setItem("currentUser", JSON.stringify(updatedUser));
                window.location.href = "/";
                return;
            }

            localStorage.setItem("actualEmail", JSON.stringify(emailValue));
            this.showRegisterForm();
        } catch (error) {
            console.error("Error validating email existence:", error);
        }
    }

    protected async showRegisterForm(): Promise<void> {
        const containerLogin = document.querySelector(".container__login");
        if (containerLogin) {
            containerLogin.classList.toggle("block");
        }

        const wrapperContainer = document.querySelector(".container");
        if (wrapperContainer) {
            wrapperContainer.innerHTML = "";
            const authFormWrapper = new AuthFormWrapper("register");
            const registerFormElement = await authFormWrapper.render();
            wrapperContainer.appendChild(registerFormElement);
        }
    }

    protected async showRegisterSuccess(): Promise<void> {
        const containerLogin = document.querySelector(".container__login");
        if (containerLogin) {
            containerLogin.classList.toggle("block");
        }

        const wrapperContainer = document.querySelector(".container");
        if (wrapperContainer) {
            wrapperContainer.innerHTML = "";
            const registerSuccessElement = RegisterSuccess.render();
            wrapperContainer.appendChild(registerSuccessElement);
        }
    }

    generate(): HTMLElement {
        this.formElement.innerHTML = "";

        // this.fields.forEach((field) => {
        //     const wrapper = document.createElement("div");
        //     wrapper.className = "input__wrapper";

        //     const input = document.createElement("input");
        //     if ('type' in field.config) {
        //         input.type = field.config.type;
        //     }
        //     input.name = field.config.name;
        //     input.className = "input";
        //     input.placeholder = field.config.label;

        //     if ('required' in field.config && field.config.required) {
        //         input.required = true;
        //     }

        //     const errorMessage = document.createElement("p");
        //     errorMessage.className = "error-message";
        //     errorMessage.setAttribute("data-error-for", field.config.name);

        //     wrapper.appendChild(input);
        //     wrapper.appendChild(errorMessage);
        //     this.formElement.appendChild(wrapper);
        // });
        this.fields.forEach(field => {
            const wrapper = document.createElement("div");
            wrapper.className = "field";

            let fieldElement: HTMLElement;

            fieldElement = field.createElement();

            const errorMessage = document.createElement("p");
            errorMessage.className = "error-message";
            errorMessage.setAttribute("data-error-for", field.config.name);

            wrapper.appendChild(fieldElement);
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
