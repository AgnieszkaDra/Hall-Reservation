import { Form } from "./Form";
import { InputField } from "../../ui/InputField";
import { RequiredRule } from "../../fields/rules/RequiredRule";
import { LengthRule } from "../../fields/rules/LengthRule";
import { ButtonSend } from "../../ui/ButtonSend";
import { SelectField } from "../../ui/SelectField";
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

const button = new ButtonSend({
    type: "submit",
    name: "registerButton",
    label: "Zarejestruj się",
});

export const RegisterForm = fetchCommunions().then((communionOptions) => {
    const communionField = new SelectField(
        {
            name: "communion",
            label: "Wybierz wspólnotę",
            options: communionOptions,
        },
        [required]
    );

    return new Form("register", [nameField, cityField, communionField], button);
});