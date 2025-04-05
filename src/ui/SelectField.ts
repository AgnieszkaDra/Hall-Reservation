import { Rule } from "../fields/rules/Rule";

export class SelectField {
    public errors: string[] = [];

    constructor(
        public config: {
            name: string;
            label: string;
            required?: boolean;
            options: { value: string; label: string }[];
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
        const wrapper = document.createElement("div");
        wrapper.className = "select-wrapper";

        const label = document.createElement("label");
        label.className = "select-label";
        label.textContent = this.config.label;
        label.htmlFor = this.config.name;

        const select = document.createElement("select");
        select.name = this.config.name;
        select.className = "select";
        if (this.config.required) select.required = true;

        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Wybierz opcję";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        select.appendChild(defaultOption);

        this.config.options.forEach(({ value, label }) => {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = label;
            select.appendChild(option);
        });

        wrapper.appendChild(label);
        wrapper.appendChild(select);

        return wrapper;
    }
}