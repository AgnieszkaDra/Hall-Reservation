import { Rule } from "./Rule";

export class PasswordRepeatRule extends Rule {
    private originalPassword: string;

    constructor(originalPassword: string) {
        super();
        this.originalPassword = originalPassword;
    }

    validate(value: any): boolean {
        return typeof value === 'string' && value === this.originalPassword;
    }

    getErrorMessage(): string {
        alert('passwords do not match');
        return "Passwords do not match.";
    }
}