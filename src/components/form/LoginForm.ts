import { Form } from "./Form";
import { Field } from "../../ui/Field";
import { RequiredRule } from "../../fields/rules/RequiredRule";
import { EmailRule } from "../../fields/rules/EmailRule";


const required = new RequiredRule();
const emailRule = new EmailRule();

const email = new Field(
    { type: "email", name: "email", label: "E-mail" },
    [required, emailRule]
);

export const LoginForm = new Form([email]);
