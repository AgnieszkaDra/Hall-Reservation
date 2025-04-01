import { fetchOrganizers } from "../../api/fetchOrganizers";
import loggedUser from "../../api/loggedUser";
import { AuthFormWrapper } from "../../components/form/AuthFormWrapper";
import { Organizer } from "../../types/Organizer";
import { Rule } from "./Rule";

export class EmailExistenceRule extends Rule {
    async validate(value: any): Promise<boolean> {
        const organizers = await fetchOrganizers();
        const exist = organizers.some((organizer: Organizer) => organizer.email === value);

        if (exist) {
            // User exists, log them in
            const existsOrganizer = organizers.find((organizer: Organizer) => organizer.email === value);
            const updatedUser = await loggedUser(existsOrganizer);
            localStorage.setItem("currentUser", JSON.stringify(updatedUser));
            window.location.href = "/"; // Navigate to home page
        } else {
            // User doesn't exist, show registration form
            alert("User not found. Showing register form.");

            // Render the AuthFormWrapper for registration
            const authForm = new AuthFormWrapper("register");
            document.body.appendChild(await authForm.render()); // Ensure form is added to DOM

            // Wait for DOM update before selecting elements
            setTimeout(() => {
                const containerLogin = document.querySelector(".container__login");
                const containerRegister = document.querySelector(".container__register");

                if (containerLogin) {
                    alert("Toggling login form visibility.");
                    containerLogin.classList.toggle("block");
                }

                if (containerRegister) {
                    alert("Toggling register form visibility.");
                    containerRegister.classList.toggle("block");
                }

                if (!containerLogin && !containerRegister) {
                    console.error("Login/Register containers not found in the DOM.");
                }
            }, 100); // Small delay to ensure elements are in DOM
        }

        return exist;
    }

    getErrorMessage(): string {
        return "This email is already registered.";
    }
}