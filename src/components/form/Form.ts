import loggedUser from "../../api/loggedUser";
import { checkIfExists } from "../../fields/rules/Organizer";
import { Field } from "../../types/fields";
import { User } from "../../types/User";
import { AuthFormWrapper } from "./AuthFormWrapper";

interface FieldGroup {
  name: string;
  fields: Field[];
}

type FormAction = (formData: Record<string, string | number>) => Promise<void> | void;

export class Form {
  protected name: string;
  protected fieldGroups: FieldGroup[] = [];
  protected formElement: HTMLFormElement;
  protected formData: Record<string, string | number> = {};
  protected actionsAfterValidate: FormAction[] = [];

  constructor(name: string) {
    this.name = name;
    this.formElement = document.createElement("form");
    this.formElement.classList.add("form");
    this.formElement.setAttribute("novalidate", "");
    this.formElement.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  addField(field: Field, groupName: string = "Default"): void {
    const group = this.fieldGroups.find((g) => g.name === groupName);
    if (group) {
      group.fields.push(field);
    } else {
      this.fieldGroups.push({ name: groupName, fields: [field] });
    }
  }

  addActionAfterValidate(action: FormAction): void {
    this.actionsAfterValidate.push(action);
  }

  private async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();

    // Validate fields
    const isValid = await this.validateFields();
    if (!isValid) return;

    this.collectFormData();

    // Call afterValidate actions if defined
    for (const action of this.actionsAfterValidate) {
      await action(this.formData);  // This will call the action, which includes afterValidate
    }
  }

  private collectFormData(): void {
    this.fieldGroups.forEach((group) => {
      group.fields.forEach((field) => {
        const input = this.getFieldInputElement(field.config.name);
        if (input) {
          this.formData[field.config.name] = input.value;
        }
      });
    });
  }

  private async validateFields(): Promise<boolean> {
    let isValid = true;

    for (const group of this.fieldGroups) {
      for (const field of group.fields) {
        const inputElement = this.getFieldInputElement(field.config.name);
        if (!inputElement) continue;

        const errorElement = this.getOrCreateErrorElement(field.config.name, inputElement);
        errorElement.textContent = "";

        const isFieldValid = field.validate ? field.validate(inputElement.value) : true;
        if (!isFieldValid) {
          isValid = false;
          errorElement.textContent = field.errors.join(", ");
        }
      }
    }

    return isValid;
  }

  private getFieldInputElement(name: string): HTMLInputElement | HTMLSelectElement | null {
    return this.formElement.querySelector(`[name="${name}"]`);
  }

  private getOrCreateErrorElement(name: string, inputElement: HTMLElement): HTMLElement {
    let errorElement = this.formElement.querySelector(`[data-error-for="${name}"]`) as HTMLElement;
    if (!errorElement) {
      errorElement = document.createElement("p");
      errorElement.className = "error-message";
      errorElement.setAttribute("data-error-for", name);
      inputElement.insertAdjacentElement("afterend", errorElement);
    }
    return errorElement;
  }

  public async afterValidate(): Promise<void> {
    const emailInput = this.getFieldInputElement("email") as HTMLInputElement;
    const emailValue = emailInput?.value.trim() || "";

    try {
      const existingOrganizer = await checkIfExists<User>("organizers", "email", emailValue);
      if (existingOrganizer) {
        const updatedUser = await loggedUser(existingOrganizer);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        this.showLoginForm();
        return;
      }

      const existingUser = await checkIfExists<User>("users", "email", emailValue);
      if (existingUser) {
        console.log(existingUser)
        this.showLoginForm();
      } else {
        this.showRegisterForm();
      }

      localStorage.setItem("actualEmail", JSON.stringify(emailValue));
    } catch (error) {
      console.error("Error validating email existence:", error);
    }
  }

  protected async showLoginForm(): Promise<void> {
    this.toggleLoginContainer();
    await this.renderWrapper("login");
  }

  protected async showRegisterForm(): Promise<void> {
    this.toggleLoginContainer();
    await this.renderWrapper("register");
  }

  private toggleLoginContainer(): void {
    const container = document.querySelector(".container__login");
    if (container) {
      container.classList.toggle("block");
    }
  }

  private async renderWrapper(type: "login" | "register"): Promise<void> {
    const wrapper = document.querySelector(".container");
    if (wrapper) {
      wrapper.innerHTML = "";
      const authFormWrapper = new AuthFormWrapper(type);
      wrapper.appendChild(await authFormWrapper.render());
    }
  }

  generate(): HTMLElement {
    this.formElement.innerHTML = "";

    this.fieldGroups.forEach((group) => {
      const groupWrapper = document.createElement("div");
      groupWrapper.className = "field-group";

      group.fields.forEach((field) => {
        const wrapper = document.createElement("div");
        wrapper.className = "field";

        const fieldElement = field.createElement();
        const errorMessage = document.createElement("p");
        errorMessage.className = "error-message";
        errorMessage.setAttribute("data-error-for", field.config.name);

        wrapper.appendChild(fieldElement);
        wrapper.appendChild(errorMessage);
        groupWrapper.appendChild(wrapper);
      });

      this.formElement.appendChild(groupWrapper);
    });

    return this.formElement;
  }

  render(): HTMLElement {
    return this.generate();
  }
}