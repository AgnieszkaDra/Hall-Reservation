export abstract class Rule {
    abstract validate(value: any): Promise<boolean> | boolean; 
    abstract getErrorMessage(): string;
}