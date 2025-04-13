import { AuthFormWrapper } from "../components/form/AuthFormWrapper";
import { Main } from "../components/Main";

export const Account = async (page: string | undefined): Promise<HTMLElement> => {
    const validPages = ['login', 'register'];
    const currentPage = validPages.includes(page || '') ? page : 'login';

    const auth = new AuthFormWrapper(currentPage).render();
    const panel = document.createElement('section');
    panel.className = 'account__panel';
    panel.innerText = 'Panel użytkownika';

    const main = await Main({
        className: 'account',
        children: [auth, panel]
    });

    return main;
};

export default Account;