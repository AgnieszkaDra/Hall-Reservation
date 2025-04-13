import { EmailRule } from "../../fields/rules/EmailRule";
import { PasswordRule } from "../../fields/rules/PasswordRule";
import { RequiredRule } from "../../fields/rules/RequiredRule";
import { ButtonField } from "../ButtonField";
import { InputField } from "./InputField";

const required = new RequiredRule();
const passwordRule = new PasswordRule();
const emailRule = new EmailRule();

export const email = new InputField(
  { type: "email", name: "emailUser", label: "E-mail" },
  [required, emailRule]
);

export const password = new InputField(
  { type: "password", name: "password", label: "Hasło" },
  [required, passwordRule]
);

export const button = new ButtonField(
  { type: "submit", name: "buttonSend", label: "Zaloguj się" }
);
