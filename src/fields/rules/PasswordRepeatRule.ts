import { Rule } from "./Rule";

export class PasswordRule extends Rule {
    validate(value: any): boolean {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return typeof value === 'string' && passwordRegex.test(value);
    }

    getErrorMessage(): string {
        alert('wrong password rule');
        return "Password must be at least 8 characters long and include uppercase, lowercase, digit, and special character.";
    }
}