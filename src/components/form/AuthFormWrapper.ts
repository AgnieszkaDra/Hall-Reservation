import { Register } from "./Register";
import { Login } from "./Login";
import { button, email, password, repeatPassword, } from "../../ui/fields/formFields";
import { InputField } from "../../ui/fields/InputField";
import { Field } from "../../types/fields";

class FormFactory {
  static async create(type: string, fields?: Field[]): Promise<HTMLElement | null> {
    switch (type) {
      case "register":
        return new Register(fields ?? []).render();
      case "login":
        return new Login(fields ?? []).render();
      default:
        return null;
    }
  }
}

export class AuthFormWrapper {
    private container: HTMLElement;
    private containerForms: HTMLElement;
    private formContainer: HTMLElement;
    private customFields: Field[] = [];
  
    constructor(private type: string = "") {
      this.container = document.createElement("section");
      this.container.className = "account__auth-form";
  
      this.containerForms = document.createElement("div");
      this.containerForms.className = "account__forms";
  
      this.formContainer = document.createElement("div");
      this.formContainer.className = this.getFormContainerClass();
  
      this.containerForms.appendChild(this.createBackHomeLink());
      this.containerForms.appendChild(this.formContainer);
      this.container.appendChild(this.containerForms);
    }
  
    setType(type: string, fields: Field[] = []) {
      this.type = type;
      this.customFields = fields;
      this.formContainer.className = this.getFormContainerClass();
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
  
    private getFormContainerClass(): string {
      return this.type === "login"
        ? "forms__login block"
        : this.type === "register"
        ? "forms__register block"
        : "";
    }
  
    async render(): Promise<HTMLElement> {
      this.formContainer.innerHTML = "";
  
      const formElement = await FormFactory.create(this.type, this.customFields);
      if (formElement) {
        this.formContainer.appendChild(formElement);
      } else {
        console.error("Form element could not be created. Invalid form type:", this.type);
      }
  
      return this.container;
    }
  }