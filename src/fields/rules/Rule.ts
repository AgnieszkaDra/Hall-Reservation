export abstract class Rule {
    abstract validate(value: any): boolean;
    abstract getErrorMessage(): string;
}