import { Form } from "./Form";
import { InputField } from "../../ui/InputField";
import { RequiredRule } from "../../fields/rules/RequiredRule";
import { PasswordRule } from "../../fields/rules/PasswordRepeatRule";
import { PasswordRepeatRule } from "../../fields/rules/PassworRepeatRule";
import { ButtonSend } from "../../ui/ButtonSend";

const required = new RequiredRule();
const passwordRule = new PasswordRule();
//const passwordRepeatRule = new PasswordRepeatRule()

const password = new InputField(
    { type: "password", name: "password", label: "Hasło" },
    [required, passwordRule]
);

const passwordRepeat = new InputField(
    { type: "password", name: "password", label: "Powtórz hasło" },
    [required]
);

const buttonSend = new ButtonSend(
    { type: "submit", name: "buttonSend", label: "Dalej" }
);

export const LoginForm = new Form('login', [password, passwordRepeat], buttonSend);
