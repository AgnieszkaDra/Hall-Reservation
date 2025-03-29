import { Field } from "../../ui/Field";
import "../../styles/form.scss";
import loggedUser from "../../api/loggedUser";

export class Form {
    protected fields: Field[];
    protected formElement: HTMLFormElement;

    constructor(fields: Field[] = []) {
        this.fields = fields;
        this.formElement = document.createElement("form");
        this.formElement.classList.add("form");
        this.formElement.setAttribute("novalidate", "");
        this.formElement.addEventListener("submit", (e) => this.handleSubmit(e));
    }

    addField(field: Field): void {
        this.fields.push(field);
    }

    private createSubmitButton(): HTMLButtonElement {
        const submitButton = document.createElement("button");
        submitButton.className ="form__button"
        submitButton.type = "submit";
        submitButton.textContent = "Dalej";
        
        return submitButton;
    }

    private handleSubmit(event: Event): void {
        event.preventDefault();
        //event.stopPropagation();

        if (this.validateFields()) {
        
        }

    }

    private validateFields(): boolean | HTMLInputElement[] {
        let isValid = true;
    
        const invalidFields: HTMLInputElement[] = [];
        
        this.fields.forEach((field) => {
            const inputElement = this.formElement.querySelector(`[name="${field.config.name}"]`) as HTMLInputElement;
            
            if (!inputElement) return;
    
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
        });
    
       
        if (invalidFields.length > 0) {
            return invalidFields; 
        }
    
        return isValid; 
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

        this.formElement.appendChild(this.createSubmitButton());

        return this.formElement;
    }

    render(): HTMLElement {
        return this.generate();
    }
}