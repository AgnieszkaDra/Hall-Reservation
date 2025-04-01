import { Rule } from "../fields/rules/Rule";

export class ButtonSend {
    public errors: string[] = [];

    constructor(
        public config: {
            required?: boolean;
            name: string;
            label: string;
            type?: string;
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

    createElement(): HTMLButtonElement {
        const button = document.createElement("button");
        button.type = (this.config.type as "button" | "submit" | "reset") || "submit"; 
        button.name = this.config.name;
        button.className = "form__button";
        button.textContent = this.config.label;

        if (this.config.required) {
            button.setAttribute("aria-required", "true");
        }

        return button;
    }
}
