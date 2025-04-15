import createTitle from "../typography/createTitle";

export const AccountWelcome = (): HTMLElement => {
    const panel = document.createElement('section');
    panel.className = 'account__panel';

    const title = createTitle('h2', 'Witaj w panelu użytkownika', '');
    const subtitle = createTitle('p', 'Zaloguj się lub zarejestruj aby móc wygodnie rezerwować sale', '');

    panel.append(title, subtitle)
    return panel;
};