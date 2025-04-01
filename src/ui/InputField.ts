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



// export class Field {
//     constructor(
//         public config: {
//             category: string;
//             type: string;
//             label: string;
//             name: string;
//             placeholder?: string;
//             required?: boolean;
//         }
//     ) {}

//     createElement(): HTMLElement {
//         const input = document.createElement("input");
//         input.type = this.config.type || "text"; 
//         input.name = this.config.name;
//         input.placeholder = this.config.placeholder || "";
//         if (this.config.required) {
//             input.required = true;
//         }
//         return input;
//     }
// }

// export class Field {
//     public validationRules: any[];

//     constructor(
//         public config: {
//             type: string;
//             name: string;
//             label: string;
//             placeholder?: string;
//             required?: boolean;
//         },
//         validationRules: any[] = [] 
//     ) {
//         this.validationRules = validationRules;
//     }

   
//     validate(value: string): boolean {
//         let isValid = true;

//         this.validationRules.forEach(rule => {
//             isValid = isValid && rule(value);
//         });

//         return isValid;
//     }

//     createElement(): HTMLElement {
//         const input = document.createElement("input");
//         input.type = this.config.type || "text"; 
//         input.name = this.config.name;
//         input.placeholder = this.config.placeholder || "";
//         if (this.config.required) {
//             input.required = true;
//         }
//         return input;
//     }
// }


import { Rule } from "../fields/rules/Rule";

export class InputField {
    public errors: string[] = [];

    constructor(
        public config: {
            required?: any; name: string; label: string; type: string 
    },
        private rules: Rule[] = []
    ) {}

    validate(value: string): boolean {
        this.errors = [];
        let isValid = true;

        for (const rule of this.rules) {
            if (!rule.validate(value)) {
                isValid = false;
                this.errors.push(rule.getErrorMessage());
            }
        }

        return isValid;
    }

    createElement(): HTMLElement {
        const input = document.createElement("input");
        input.type = this.config.type;
        input.name = this.config.name;
        input.className = "input";
        input.placeholder = this.config.label;
        if (this.config.required) {
                input.required = true;
            }

        return input;
    }
}