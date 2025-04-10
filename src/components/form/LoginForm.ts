import { Form } from "./Form";
import { InputField } from "../../ui/fields/InputField";
import { RequiredRule } from "../../fields/rules/RequiredRule";
import { PasswordRule } from "../../fields/rules/PasswordRule";
import { ButtonField } from "../../ui/ButtonField";

const required = new RequiredRule();
const passwordRule = new PasswordRule();

const password = new InputField(
  { type: "password", name: "password", label: "Hasło" },
  [required, passwordRule]
);

const passwordRepeat = new InputField(
  { type: "password", name: "passwordRepeat", label: "Powtórz hasło" }, 
  [required]
);

const buttonSend = new ButtonField(
  { type: "submit", name: "buttonSend", label: "Dalej" }
);

export const LoginForm = new Form("login");
LoginForm.addField(password, "Personal data");
LoginForm.addField(passwordRepeat, "Personal data");
LoginForm.addField(buttonSend, "Personal data");