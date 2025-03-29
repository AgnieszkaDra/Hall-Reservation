// import { Field } from "../ui/Field";

// export class Form {
//     private fields: Field[];

//     constructor(public selector: string, fields: Field[] = []) {
//         this.fields = fields;
//     }

//     addField(field: Field): void {
//         this.fields.push(field);
//     }

//     generate(container: HTMLElement): void {
//         const formElement = document.createElement("form");
//         formElement.classList.add("form");

//         this.fields.forEach(field => {
//             const label = document.createElement("label");
//             label.textContent = field.label;

//             const input = document.createElement("input");
//             input.type = field.type;
//             input.name = field.name;

//             label.appendChild(input);
//             formElement.appendChild(label);
//         });

//         container.appendChild(formElement);
//     }
// }