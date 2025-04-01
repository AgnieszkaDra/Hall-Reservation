import { Field } from "../../ui/InputField";
import { RequiredRule } from "../rules/RequiredRule";

export class Organizer extends Field {
    public options: { label: string; value: string }[] = [];

    constructor(
        name: string = "organizer",
        type: string = "select",
        label: string = "Choose an organizer",
        value: any = ""
    ) {
        super(name, type, label, [new RequiredRule()], value);
    }

    async fetchAndSetOptions(apiUrl: string) {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.organizers && Array.isArray(data.organizers)) {
                this.options = data.organizers.map((org: { name: string }) => ({
                    label: org.name,
                    value: org.name,
                }));
            }
        } catch (error) {
            console.error("Error fetching organizers:", error);
        }
    }
}