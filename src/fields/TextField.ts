import { Field } from "../ui/Field";

export class TextField extends Field {
    constructor(
        public config: {
            category: string;
            type: string;
            label: string;
            name: string;
            placeholder?: string;
            required?: boolean;
        }
    ) {
        super({ name: config.name, label: config.label });
    }

    createElement(): HTMLElement {
        const input = document.createElement("input");
        input.type = this.config.type;
        input.name = this.config.name;
        input.placeholder = this.config.placeholder || "";
        if (this.config.required) {
            input.required = true;
        }
        return input;
    }
}