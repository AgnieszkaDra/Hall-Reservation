import { Form } from "./Form";
import { InputField } from "../../ui/InputField";
import { RequiredRule } from "../../fields/rules/RequiredRule";
import { EmailRule } from "../../fields/rules/EmailRule";
import { EmailExistenceRule } from "../../fields/rules/EmailExistenceRule";
import { ButtonSend } from "../../ui/ButtonSend";

const required = new RequiredRule();
const emailRule = new EmailRule();
const emailExistenceRule = new EmailExistenceRule();

const email = new InputField(
    { type: "email", name: "email", label: "E-mail" },
    [required, emailRule, emailExistenceRule]
);

const buttonSend = new ButtonSend(
    { type: "submit", name: "buttonSend", label: "Dalej" }
);

const containerLogin = document.querySelector('.container__login')
            if (containerLogin) {
                containerLogin.classList.toggle('block')
            }

export const LoginForm = new Form('login', [email], buttonSend);
