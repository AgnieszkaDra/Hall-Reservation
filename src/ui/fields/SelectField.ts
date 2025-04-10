import { Rule } from "../../fields/rules/Rule";
import { Field } from "../../types/fields";

export class SelectField implements Field {
  public errors: string[] = [];

  constructor(
    public config: {
      name: string;
      label: string;
      type: string; // should be 'select'
      options: { value: string; label: string }[];
    },
  ) {}

  createElement(): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.className = "select-wrapper";

    const label = document.createElement("label");
    label.className = "select-label";
    label.textContent = this.config.label;
    label.htmlFor = this.config.name;

    const select = document.createElement("select");
    select.name = this.config.name;
    select.className = "select";
    select.id = this.config.name;

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Wszystkie wspólnoty";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    this.config.options.forEach(({ value, label }) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      select.appendChild(option);
    });

    wrapper.appendChild(label);
    wrapper.appendChild(select);

    return wrapper;
  }

  // validate(value: string): boolean {
  //   this.errors = [];

  //   if (this.config.required && value === "") {
  //     this.errors.push("To pole jest wymagane.");
  //     return false;
  //   }

  //   return true;
  // }
}