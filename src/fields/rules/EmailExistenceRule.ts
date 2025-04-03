import { fetchOrganizers } from "../../api/fetchOrganizers";
import loggedUser from "../../api/loggedUser";
import { AuthFormWrapper } from "../../components/form/AuthFormWrapper";
import { Organizer } from "../../types/Organizer";
import { Rule } from "./Rule";

export class EmailExistenceRule extends Rule {
    async validate(value: string): Promise<boolean> {
        try {
            const organizers = await fetchOrganizers();
            const existingOrganizer = organizers.find((organizer: Organizer) => organizer.email === value);

            if (existingOrganizer) {
                const updatedUser = await loggedUser(existingOrganizer);
                localStorage.setItem("currentUser", JSON.stringify(updatedUser));
                window.location.href = "/";
                return true;
            }

            this.showRegisterForm();
            return false;
        } catch (error) {
            console.error("Error validating email existence:", error);
            return false;
        }
    }

    private showRegisterForm(): void {
        const containerLogin = document.querySelector('.container__login');
        if (containerLogin) {
            containerLogin.classList.toggle('block');
        }

        const wrapperContainer = document.querySelector('.container');
        if (wrapperContainer) {
            wrapperContainer.innerHTML = ''; 
            new AuthFormWrapper('register').render().then(registerFormElement => {
                wrapperContainer.appendChild(registerFormElement);
            });
        }
    }

    getErrorMessage(): string {
        return "This email is already registered.";
    }
}