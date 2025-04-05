import { Form } from "./Form";
import { InputField } from "../../ui/InputField";
import { RequiredRule } from "../../fields/rules/RequiredRule";
import { LengthRule } from "../../fields/rules/LengthRule";
import { ButtonSend } from "../../ui/ButtonSend";

const required = new RequiredRule();
const lengthRule = (amount: number) => new LengthRule(amount);

const name = new InputField(
    { type: "text", name: "name", label: "Imię i Nazwisko" },
    [required, lengthRule(3)]
);

const city = new InputField(
    { type: "text", name: "miast0", label: "miasto" },
    [required, lengthRule(4)]
);

const buttonSend = new ButtonSend(
    { type: "submit", name: "buttonSend", label: "Zarejestruj się" }
);

export const RegisterForm = new Form('register', [name, city], buttonSend);
