// import { Organizer } from "../fields/helpers/Organizer";

// export class OrganizerSelect {
//     private selectElement: HTMLSelectElement;
//     private organizerField: Organizer;

//     constructor(containerId: string, apiUrl: string) {
//         this.organizerField = new Organizer();
//         this.selectElement = document.createElement("select");
//         this.selectElement.id = "organizer";
//         this.selectElement.className = "border p-2 rounded-md";

//         const label = document.createElement("label");
//         label.htmlFor = "organizer";
//         label.innerText = "Choose an organizer";
//         label.className = "text-sm font-medium";

//         const container = document.getElementById(containerId);
//         if (container) {
//             container.appendChild(label);
//             container.appendChild(this.selectElement);
//         }

//         this.populateOptions(apiUrl);
//     }

//     async populateOptions(apiUrl: string) {
//         await this.organizerField.fetchAndSetOptions(apiUrl);
//         this.updateSelectOptions();
//     }

//     updateSelectOptions() {
//         this.selectElement.innerHTML = "";

//         // Default placeholder option
//         const defaultOption = document.createElement("option");
//         defaultOption.value = "";
//         defaultOption.innerText = "Select an organizer...";
//         defaultOption.disabled = true;
//         defaultOption.selected = true;
//         this.selectElement.appendChild(defaultOption);

//         // Populate with fetched data
//         this.organizerField.options.forEach((opt) => {
//             const optionElement = document.createElement("option");
//             optionElement.value = opt.value;
//             optionElement.innerText = opt.label;
//             this.selectElement.appendChild(optionElement);
//         });
//     }
// }