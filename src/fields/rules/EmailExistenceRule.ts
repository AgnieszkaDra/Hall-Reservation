import { fetchOrganizers } from "../../api/fetchOrganizers";
import loggedUser from "../../api/loggedUser";
import { RegisterForm } from "../../components/form/RegisterForm";
import { Organizer } from "../../types/Organizer";
import { Rule } from "./Rule";

export class EmailExistenceRule extends Rule {
    async validate(value: any): Promise<boolean> {
        const organizers = await fetchOrganizers();
        const exist = organizers.some((organizer: Organizer) => organizer.email === value);

        if (exist) {
            const existsOrganizer = organizers.find((organizer: Organizer) => organizer.email === value);
            const updatedUser = await loggedUser(existsOrganizer);
            localStorage.setItem("currentUser", JSON.stringify(updatedUser));
            window.location.href = "/"; 
        } else {
            const containerLogin = document.querySelector('.container__login');
            if (containerLogin) {
                containerLogin.classList.toggle('block');
            }
            const registerFormElement = RegisterForm.render(); 

            const wrapperForm = document.querySelector('.container__forms');
            if (wrapperForm) {
                wrapperForm.appendChild(registerFormElement);
            }
        }

        return exist;
    }

    getErrorMessage(): string {
        return "This email is already registered.";
    }
}