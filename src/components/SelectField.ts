import { Field } from "../ui/Field";

export class SelectField extends Field {
    constructor(
        public config: { name: string; label: string; options: string[] }
    ) {
        super({ name: config.name, label: config.label });
    }

    createElement(): HTMLElement {
        const select = document.createElement("select");
        this.config.options.forEach(option => {
            const optionElement = document.createElement("option");
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });
        return select;
    }
}