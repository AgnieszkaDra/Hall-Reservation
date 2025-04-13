import { actualOrganizer } from "../../api/actualOrganizer";
import actualUser from "../../api/actualUser";
import { checkIfExists } from "../../fields/rules/Organizer";
import { Field } from "../../types/fields";
import { User } from "../../types/User";
import { getActualUser, getCurrentOrganizator } from "../../utils/auth";
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
  protected actionsBeforeValidate: FormAction[] = [];
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

  addActionBeforeValidate(action: FormAction): void {
    this.actionsBeforeValidate.push(action);
  }

  addActionAfterValidate(action: FormAction): void {
    this.actionsAfterValidate.push(action);
  }

  private async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();

    const isValid = await this.validateFields();
    if (!isValid) return;

    this.collectFormData();

    for (const action of this.actionsAfterValidate) {
      await action(this.formData); 
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

  public async beforeValidate(): Promise<void> {
     try {
        const [organizerLog, userLog] = await Promise.all([getCurrentOrganizator(), getActualUser()]);
        const user = []
        const loggedInUser = userLog || organizerLog;
    
        if (loggedInUser) {
          console.log(loggedInUser)
          const [existingOrganizer, existingUser] = await Promise.all([
            checkIfExists<User>("organizers", "email", loggedInUser.email),
            checkIfExists<User>("users", "email", loggedInUser.email)
          ]);
    
          if (existingOrganizer ) {
            user.push(existingOrganizer);
            console.log(user[0]?.email); ///
          } else if(existingUser){
            user.push(existingUser);
            console.log(user[0]?.email); ///
          }
                
        } else {
          console.log("No user is logged in.");
         
        }
      } catch (error) {
        console.error("Error while checking user login:", error);
      }
  }

  public async afterValidate(value: string): Promise<void> {
    try {
    
      const existingOrganizer = await checkIfExists<User>("organizers", "email", value);
      if (existingOrganizer) {
        const organizer = await actualOrganizer(existingOrganizer);
        localStorage.setItem("currentOrganizer", JSON.stringify(organizer));
        this.showLoginForm();
        return;
      }
  
      const existingUser = await checkIfExists<User>("users", "email", value);
      if (existingUser) {
        const user = await actualUser(existingUser);
        localStorage.setItem("actualUser", JSON.stringify(user));
        this.showLoginForm();
      } else {
        this.showRegisterForm();
      }
  
  
      //localStorage.setItem("actualEmail", JSON.stringify(value));
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

  async generate(): Promise<HTMLElement> {
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

    for (const action of this.actionsBeforeValidate) {
      await action(this.formData);  // This will call the action, which includes afterValidate
    }

    return this.formElement;
  }

  async render(): Promise<HTMLElement> {
    return await this.generate();
  }
}