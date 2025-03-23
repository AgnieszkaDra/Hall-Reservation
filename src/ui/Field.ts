//import { Rule } from "../fields/rules/Rule";

// export class Field {
//     constructor(
//         public name: string,
//         public type: string,
//         public label: string,
//         //public rules: Rule[] = [],
//         //public value: any = ""
//     ) {}

//     // validate(): string[] {
//     //     return this.rules
//     //         .filter(rule => !rule.validate(this.value))
//     //         .map(rule => rule.getErrorMessage());
//     // }
// }



export class Field {
    constructor(
        public config: { name: string; label: string }
    ) {}

    createElement(): HTMLElement {
        const input = document.createElement("input");
        input.type = "text"; 
        input.name = this.config.name;
        return input;
    }
}