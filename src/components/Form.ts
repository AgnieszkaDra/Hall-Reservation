import { Field } from "../ui/Field";
import '../styles/form.scss'

export class Form {
    private fields: Field[];

    constructor(fields: Field[] = []) {
        this.fields = fields;
    }

    addField(field: Field): void {
        this.fields.push(field);
    }

    generate(container: HTMLElement): void {
        const formElement = document.createElement("form");
        formElement.classList.add("form");

        this.fields.forEach(field => {
            const label = document.createElement("label");
            label.textContent = field.config.label;

            const inputElement = field.createElement(); 
            label.appendChild(inputElement);
            formElement.appendChild(label);
        });

        container.appendChild(formElement);
    }
}