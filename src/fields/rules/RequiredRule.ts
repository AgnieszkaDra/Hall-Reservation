import { Rule } from "./Rule";

export class RequiredRule extends Rule {
    private isRequired: boolean;

    constructor(isRequired: boolean = true) {
        super();
        this.isRequired = isRequired;
    }

    validate(value: any): boolean {
        if (!this.isRequired) return true; 
        return value !== null && value !== undefined && value !== "";
    }

    getErrorMessage(): string {
        alert('required')
        return "This field is required.";
    }
}