import { Rule } from "./Rule";

export class EmailRule extends Rule {
    validate(value: any): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return typeof value === 'string' && emailRegex.test(value);
    }

    getErrorMessage(): string {
        alert('wrong emair rule')
        return "Invalid email address.";
    }
}