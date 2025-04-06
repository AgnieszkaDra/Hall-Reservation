import { EmailForm } from "./EmailForm";
import "../../styles/form.scss";
import { RegisterForm } from "./RegisterForm";
import { getCurrentUser } from "../../utils/auth";
import UserAccount from "../sections/UserAccount";
import { LoginForm } from "./LoginForm";

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
        const titles: Record<string, string> = {
            register: "Rejestracja",
            login: "Logowanie",
            email: "Zarezerwuj salę",
        };
        
        formTitle.textContent = titles[type] ?? "Zarezerwuj salę";
       
        const formSubTitle = document.createElement("p");
        formSubTitle.className = "form__paragraph";
        const subTitles: Record<string, string> = {
            register: "Zarejestruj się",
            login: "Podaj hasło, aby się zalogować",
            email: "Utwórz konto lub zaloguj się, aby wygodnie rezerwować sale",
        };
        formSubTitle.textContent = subTitles[type] ?? subTitles.email;
       
        container.append(formTitle, formSubTitle);
        return container;
    }
    
    async render(): Promise<HTMLElement> {
        const containerForms = document.createElement("div");
        containerForms.className = "container__forms";

        containerForms.appendChild(this.createBackHomeLink());

        if (this.userLog) {
            const user = await UserAccount();
            this.container.appendChild(user);
            return this.container;
        }

        const formContainer = this.createFormContainer(this.type);
        let formElement: HTMLElement | null = null;

        if (this.type === "register") {
            formElement = (await RegisterForm).render();
        } else if(this.type === "email") {
            formElement = EmailForm.render();
        } else if(this.type === "login") {
            formElement = LoginForm.render();
        }

        if (formElement) {
            containerForms.append(formContainer, formElement);
        } else {
            console.error("Form element could not be created. Invalid form type:", this.type);
        }
        this.container.appendChild(containerForms);

        return this.container;
    }
}