import { LoginForm } from "./LoginForm";
import "../../styles/form.scss";
import { RegisterForm } from "./RegisterForm";
import { getCurrentUser } from "../../utils/auth";
import UserAccount from "../sections/UserAccount";

export class AuthFormWrapper {
    private container: HTMLElement;
    private userLog: string | null;

    constructor(private type: string = "") {
        this.container = document.createElement("div");
        this.container.className = "container";
        this.userLog = null;
    }

    async initialize(): Promise<void> {
        this.userLog = await getCurrentUser();
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

    private createFormContainer(type: string): HTMLElement {
        const container = document.createElement("div");
        container.className = type === "register" ? "container__register block" : "container__login block";

        const formTitle = document.createElement("h2");
        formTitle.className = "form__title";
        formTitle.textContent = type === "register" ? "Rejestracja" : "Zarezerwuj salę";

        const formSubTitle = document.createElement("p");
        formSubTitle.className = "form__paragraph";
        formSubTitle.textContent = "Utwórz konto lub zaloguj się, aby wygodnie rezerwować sale";

        container.append(formTitle, formSubTitle);
        return container;
    }

    async render(): Promise<HTMLElement> {
        const containerForms = document.createElement("div");
        containerForms.className = "container__forms";

        containerForms.appendChild(this.createBackHomeLink());

        // Check if user is already logged in
        if (this.userLog) {
            const user = await UserAccount();
            this.container.appendChild(user);
            return this.container;
        }

        const formContainer = this.createFormContainer(this.type);
        let formElement: HTMLElement;

        if (this.type === "register") {
            formElement = RegisterForm.render();
        } else {
            formElement = LoginForm.render();
        }

        containerForms.append(formContainer, formElement);
        this.container.appendChild(containerForms);

        return this.container;
    }
}