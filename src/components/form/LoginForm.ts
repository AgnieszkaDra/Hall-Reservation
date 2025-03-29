import { Form } from "./Form";
import { Field } from "../../ui/Field";
import { RequiredRule } from "../../fields/rules/RequiredRule";
import { EmailRule } from "../../fields/rules/EmailRule";
import { EmailExistenceRule } from "../../fields/rules/EmailExistenceRule";

const required = new RequiredRule();
const emailRule = new EmailRule();
const emailExistenceRule = new EmailExistenceRule();

const email = new Field(
    { type: "email", name: "email", label: "E-mail" },
    [required, emailRule, emailExistenceRule]
);

export const LoginForm = new Form([email]);
