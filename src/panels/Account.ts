import { authWrapper } from "../shared/authWrapper";
import { Main } from "../components/Main";
import { AccountWelcome } from "./AccountWelcom";
import { Field } from "../types/fields"; 

type AccountProps = {
  type?: string;
  fields: Field[];
};

export const Account = async ({ type, fields }: AccountProps): Promise<HTMLElement> => {
  const validPages = ['login', 'register'];
  const currentPage: string = validPages.includes(type || '') ? type! : 'login';

  authWrapper.setType(currentPage, fields);
  const auth = await authWrapper.render();

  const panel = AccountWelcome();

  const main = await Main({
    className: 'account',
    children: [auth, panel]
  });

  return main;
};

