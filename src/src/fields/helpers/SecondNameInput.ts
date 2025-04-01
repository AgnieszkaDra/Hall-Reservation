import { Field } from "../../ui/InputField";
import { RequiredRule } from "../rules/RequiredRule";
import { LengthRule } from "../rules/LengthRule";

export class SecondNameInput extends Field {
    constructor(
        name: string = 'secondName',
        type: string = 'text',  
        label: string = 'Nazwisko',
        value: any = ""
    ) {
        super(name, type, label, [new RequiredRule(), new LengthRule(3)], value);  // Use 'type' here
    }
}