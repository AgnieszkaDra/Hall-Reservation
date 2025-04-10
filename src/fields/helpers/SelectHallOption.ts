import { Field } from "../../ui/fields/InputField";
import { RequiredRule } from "../rules/RequiredRule";

export class SelectHallOption extends Field {
    public options: { label: string; value: string }[];

    constructor(
        name: string = 'sale',
        type: string = 'select',  
        label: string = 'Choice the sale',
        value: any = "",
        options: { label: string; value: string }[] = [
            { label: 'St.Augustin', value: 'St.Augustin' },
            { label: 'St.John Paul II', value: 'St.John Paul II' },
            { label: 'St. Family', value: 'St. Family' }
        ]
    ) {
        super(name, type, label, [new RequiredRule()], value); 
        this.options = options;  
    }
}