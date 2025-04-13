import { Register } from "./Register";
import { Login } from "./Login";
import { button, email, password } from "../../ui/fields/fieldTypes";

class FormFactory {
    static async create(type: string): Promise<HTMLElement | null> {
        switch (type) {
            case "register":
                const registerForm = new Register([email, password]);  
                return registerForm.render();
            case "login":
                const loginSection = new Login([email, password, button]);
                return loginSection.render(); 
            default:
                return null;
        }
    }
}

export class AuthFormWrapper {
    private container: HTMLElement;

    constructor(private type: string = "") {
        this.container = document.createElement("section");
        this.container.className = "account__auth-form";
    }

    private createBackHomeLink(): HTMLElement {
        const link = document.createElement("a");
        link.className = "account__link-home";
        link.href = "/index.html";

        const text = document.createElement("h3");
        text.innerText = "Strona główna";
        link.appendChild(text);

        return link;
    }

    private createFormContainer(): HTMLElement {
        const container = document.createElement("div");
    
        if (this.type === "login") {
            container.className = "forms__login block";
        } else if (this.type === "register") {
            container.className = "forms__register block";
        }
    
        console.log(container);
        return container;
    }

    async render(): Promise<HTMLElement> {
        const containerForms = document.createElement("div");
        containerForms.className = "account__forms";
        containerForms.appendChild(this.createBackHomeLink());
    
        const formContainer = this.createFormContainer();
        const formElement = await FormFactory.create(this.type);
    
        if (formElement) {
            formContainer.appendChild(formElement); 
            containerForms.append(formContainer);
            this.container.appendChild(containerForms);
        } else {
            console.error("Form element could not be created. Invalid form type:", this.type);
        }
    
        return this.container;
    }
}