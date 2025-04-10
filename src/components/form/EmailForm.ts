import { Form } from "./Form";
import { InputField } from "../../ui/fields/InputField";
import { ButtonField } from "../../ui/ButtonField";
import { RequiredRule } from "../../fields/rules/RequiredRule";
import { EmailRule } from "../../fields/rules/EmailRule";

const required = new RequiredRule();
const emailRule = new EmailRule();

const email = new InputField(
  { type: "email", name: "email", label: "E-mail" },
  [required, emailRule]
);

const buttonSend = new ButtonField(
  { type: "submit", name: "buttonSend", label: "Dalej" }
);

export const EmailForm = new Form("login");

EmailForm.addField(email, "dane logowanie");
EmailForm.addField(buttonSend);  

EmailForm.addActionAfterValidate(async () => {
  await EmailForm.afterValidate();
});