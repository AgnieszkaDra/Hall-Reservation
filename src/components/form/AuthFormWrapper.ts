import { LoginForm } from "./LoginForm";
import "../../styles/form.scss";
import UserAccount from "../sections/UserAccount";

export class AuthFormWrapper {
    private container: HTMLElement;
    private wrapperForm: HTMLElement;
    private formTitle: HTMLElement;
    private formSubTitle: HTMLElement;
    private userData: any | null; // Store parsed user data

    constructor(private type: string = "") {
        this.container = document.createElement("div");
        this.container.className = "container";

        // Retrieve and parse currentUser from localStorage safely
        const userLog = localStorage.getItem("currentUser");
        try {
            this.userData = userLog ? JSON.parse(userLog) : null;
        } catch (error) {
            console.error("Error parsing currentUser from localStorage", error);
            this.userData = null;
        }

        // Wrapper
        this.wrapperForm = document.createElement("div");
        this.wrapperForm.className = "form__wrapper";

        // Title
        this.formTitle = document.createElement("h2");
        this.formTitle.className = "form__title";
        this.formTitle.textContent = type === "register" ? "Rejestracja" : "Zarezerwuj salę";

        this.formSubTitle = document.createElement("p");
        this.formSubTitle.className = "form__paragraph";
        this.formSubTitle.textContent =
            type === "register"
                ? "Rejestracja"
                : "Utwórz konto lub zaloguj się, aby wygodnie rezerwować sale";
    }

    private createBackHomeLink(): HTMLElement {
        const backHomeLink = document.createElement("a");
        backHomeLink.className = "container__link-home";
        backHomeLink.href = "/index.html";

        const backHome = document.createElement("h3");
        backHome.innerText = "Strona główna";
        backHomeLink.appendChild(backHome);

        return backHomeLink;
    }

    async render(): Promise<HTMLElement> {
        const containerForms = document.createElement("div");
        containerForms.className = "container__forms";
        containerForms.appendChild(this.createBackHomeLink());

        if (this.type === "register") {
            // RegisterForm should be added here when available
            // containerForms.appendChild(new RegisterForm().render());
        } else if (this.userData) {
            const user = await UserAccount();
            this.container.appendChild(user);
          }else {
            this.wrapperForm.appendChild(this.formTitle);
            this.wrapperForm.appendChild(this.formSubTitle);
            this.wrapperForm.appendChild(LoginForm.render()); 
            containerForms.appendChild(this.wrapperForm);
            this.container.appendChild(containerForms);
        }

        return this.container;
    }
}


