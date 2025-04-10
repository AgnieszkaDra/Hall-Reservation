import { Rule } from "./Rule";

export class PasswordRule extends Rule {
    private minLength: number;

    constructor(minLength: number = 8) {
        super();
        this.minLength = minLength;
    }

    validate(value: string): boolean {
        if (typeof value !== "string") return false;
        
        const hasMinLength = value.length >= this.minLength;
        const hasLetter = /[a-zA-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);

        return hasMinLength && hasLetter && hasNumber;
    }

    getErrorMessage(): string {
        return `Password must be at least ${this.minLength} characters long and include both letters and numbers.`;
    }
}