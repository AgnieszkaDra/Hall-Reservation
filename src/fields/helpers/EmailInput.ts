import { Field } from "../../ui/Field";
import { RequiredRule } from "../rules/RequiredRule";
import { EmailRule } from "../rules/EmailRule";

export class EmailInput extends Field {
    constructor(
        name: string = 'email', 
        label: string = 'E-mail', 
        value: any = ""
    ) {
        super(name, name, label, [new RequiredRule(), new EmailRule()], value);
    }
}