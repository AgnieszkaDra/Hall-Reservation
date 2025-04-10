import { AuthFormWrapper } from "../components/form/AuthFormWrapper";
import { Main } from "../components/Main";

export const MyAccount = async () => {
    const app = document.querySelector("#app");

    const auth = new AuthFormWrapper('email').render()
    const main = Main(auth);

    app?.append(main);
    return app;

};

export default MyAccount