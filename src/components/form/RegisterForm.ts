import { Form } from "./Form";
import { InputField } from "../../ui/InputField";
import { RequiredRule } from "../../fields/rules/RequiredRule";
import { EmailRule } from "../../fields/rules/EmailRule";
import { LengthRule } from "../../fields/rules/LengthRule";
import { ButtonSend } from "../../ui/ButtonSend";

const required = new RequiredRule();
const emailRule = new EmailRule();
const lengthRule = (amount: number) => new LengthRule(amount);

const name = new InputField(
    { type: "text", name: "name", label: "Imię i Nazwisko" },
    [required, lengthRule(3)]
);

const email = new InputField(
    { type: "email", name: "email", label: "E-mail" },
    [required, emailRule ]
);

const buttonSend = new ButtonSend(
    { type: "submit", name: "buttonSend", label: "Zarejestruj się" }
);

export const RegisterForm = new Form('register', [name, email], buttonSend);
