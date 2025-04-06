import { Rule } from "../fields/rules/Rule";
import { Field } from "../types/fields";

export class InputField implements Field{
    public errors: string[] = [];

    constructor(
        public config: {
            required?: any; name: string; label: string; type: string 
    },
        private rules: Rule[] = []
    ) {}

    validate(value: string): boolean {
        this.errors = [];
        let isValid = true;

        for (const rule of this.rules) {
            if (!rule.validate(value)) {
                isValid = false;
                this.errors.push(rule.getErrorMessage());
            }
        }

        return isValid;
    }

    createElement(): HTMLElement {
        const input = document.createElement("input");
        input.type = this.config.type;
        input.name = this.config.name;
        input.className = "input";
        input.placeholder = this.config.label;
        if (this.config.required) {
                input.required = true;
            }

        return input;
    }
}