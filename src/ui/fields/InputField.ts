import { Rule } from "../../fields/rules/Rule";
import { Field } from "../../types/fields";

export class InputField implements Field {
  public errors: string[] = [];
  private inputElement!: HTMLInputElement;
  private errorElement!: HTMLElement;

  constructor(
    public config: { name: string; label: string; type: string },
    public rules: Rule[] = []
  ) {}

  getValue(): string {
    return this.inputElement?.value || '';
  }

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
    const wrapper = document.createElement("div");
    wrapper.className = "input__wrapper";

    const input = document.createElement("input");
    input.type = this.config.type;
    input.name = this.config.name;
    input.className = "input";
    input.placeholder = this.config.label;

    this.inputElement = input;

    // Ensure errorElement is created once during rendering
    this.errorElement = document.createElement("div");
    this.errorElement.className = "input__error";

    wrapper.appendChild(input);
    wrapper.appendChild(this.errorElement);

    return wrapper;
  }

  showErrors(errors: string[]): void {
    if (!this.errorElement) return;

    this.errorElement.innerHTML = ""; // Clear previous errors
    if (errors.length > 0) {
      this.errorElement.innerHTML = errors.map(err => `<p>${err}</p>`).join("");
      this.errorElement.style.display = "block";
    } else {
      this.errorElement.style.display = "none";
    }
  }
}