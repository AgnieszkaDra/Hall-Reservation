import "../../styles/form.scss";
import { EmailForm } from "./EmailForm";
import { RegisterForm } from "./RegisterForm";
import { LoginForm } from "./LoginForm";
import { getCurrentUser } from "../../utils/auth";
import UserAccount from "../sections/UserAccount";


class FormTitle {
    constructor(private type: string) {}

    create(): HTMLElement {
        const title = document.createElement("h2");
        title.className = "form__title";
        const titles: Record<string, string> = {
            register: "Rejestracja",
            login: "Logowanie",
            email: "Zarezerwuj salę",
        };
        title.textContent = titles[this.type] ?? titles.email;
        return title;
    }
}

class FormSubTitle {
    constructor(private type: string) {}

    create(): HTMLElement {
        const subtitle = document.createElement("p");
        subtitle.className = "form__paragraph";
        const subtitles: Record<string, string> = {
            register: "Zarejestruj się",
            login: "Podaj hasło, aby się zalogować",
            email: "Utwórz konto lub zaloguj się, aby wygodnie rezerwować sale",
        };
        subtitle.textContent = subtitles[this.type] ?? subtitles.email;
        return subtitle;
    }
}

class FormFactory {
    static async create(type: string): Promise<HTMLElement | null> {
        switch (type) {
            case "register":
                return (await RegisterForm).render();
            case "email":
                return EmailForm.render();
            case "login":
                return LoginForm.render();
            default:
                return null;
        }
    }
}

export class AuthFormWrapper {
    private container: HTMLElement;
    private userLog: string | null = null;

    constructor(private type: string = "") {
        this.container = document.createElement("div");
        this.container.className = "container";
    }

    async initialize(): Promise<void> {
        this.userLog = await getCurrentUser();
    }

    private createBackHomeLink(): HTMLElement {
        const link = document.createElement("a");
        link.className = "container__link-home";
        link.href = "/index.html";

        const text = document.createElement("h3");
        text.innerText = "Strona główna";
        link.appendChild(text);

        return link;
    }

    private createFormContainer(): HTMLElement {
        const container = document.createElement("div");
        container.className = this.type === "register" ? "container__register block" : "container__login block";
        container.className = this.type === "email" ? "container__register block" : "container__login block";

        const title = new FormTitle(this.type).create();
        const subtitle = new FormSubTitle(this.type).create();
        container.append(title, subtitle);

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

        const formContainer = this.createFormContainer();
        console.log(formContainer)
        const formElement = await FormFactory.create(this.type);
        console.log(formElement) /// form element is not visible

        if (formElement) {
            containerForms.append(formContainer, formElement);
        } else {
            console.error("Form element could not be created. Invalid form type:", this.type);
        }
       
        this.container.appendChild(containerForms);
        return this.container;
    }
}