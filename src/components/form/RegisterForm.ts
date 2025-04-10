import { Form } from "./Form";
import { InputField } from "../../ui/fields/InputField";
import { SelectField } from "../../ui/fields/SelectField";
import { ButtonField } from "../../ui/ButtonField";
import { RequiredRule } from "../../fields/rules/RequiredRule";
import { LengthRule } from "../../fields/rules/LengthRule";
import { fetchCommunions } from "../../api/fetchCommunions";

const required = new RequiredRule();
const lengthRule = (amount: number) => new LengthRule(amount);

const nameField = new InputField(
  { type: "text", name: "name", label: "Imię i Nazwisko" },
  [required, lengthRule(3)]
);

const cityField = new InputField(
  { type: "text", name: "miasto", label: "Miasto" },
  [required, lengthRule(4)]
);

const buttonRegister = new ButtonField(
  { type: "submit", name: "registerButton", label: "Zarejestruj się" }
);


export const RegisterForm = fetchCommunions().then((communionOptions) => {
  const communionField = new SelectField({
    name: "communion",
    label: "Wybierz wspólnotę",
    type: "select",
    options: communionOptions,
  });

  const form = new Form("register");
  form.addField(nameField, "Personal data");
  form.addField(cityField, "Personal data");
  form.addField(communionField, "Wspólnota");
  form.addField(buttonRegister, "Wspólnota");

  return form;
});