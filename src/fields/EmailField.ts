import { Field } from "../ui/InputField";

export class EmailField extends Field {
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
        super({
            ...config,
            type: "email",
        });
    }
}
