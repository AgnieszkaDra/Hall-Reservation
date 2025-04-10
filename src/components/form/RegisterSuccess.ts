import { Container } from "../../ui/Container";
import createTitle from "../../typography/createTitle";
import { BackHome } from "../../ui/BackHome";

const title = createTitle('h2', 'Dobra wiadomość, twoje konto zostało zarejestrowane', 'register-success__title');

const paragraph = document.createElement('p');
paragraph.className = 'register-success__paragraph';
paragraph.innerText = 'Rejestracja przebiegła pomyślnie. Zaloguj się, aby rezerwować sale';

const loginLink = document.createElement("a");
loginLink.classList.add("loginIcon__link");
loginLink.setAttribute("id", "loginIcon");
loginLink.href = "/moje-konto"

const linkHome = BackHome({ text: 'Strona główna', className: 'register-success__link', headingLevel: 'h3' });

export const RegisterSuccess = new Container('register-success', [title, paragraph,linkHome]);
