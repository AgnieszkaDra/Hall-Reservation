import { Rule } from "./Rule";

export class LengthRule extends Rule {
    private minLength: number;

    constructor(minLength: number) {
        super();
        this.minLength = minLength;
    }

    validate(value: any): boolean {
        return typeof value === 'string' && value.length >= this.minLength;
    }

    getErrorMessage(): string {
        return `Value must be at least ${this.minLength} characters long.`;
    }
}