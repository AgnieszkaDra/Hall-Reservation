import LoginUser from "../../ui/LoginUser.ts";

export const AccountSection = async (): Promise<HTMLElement> => {

  const wrapperAccount = document.createElement("div");
  wrapperAccount.className = "account__wrapper";

  const loginEl = await LoginUser();
  wrapperAccount.appendChild(loginEl);

  return wrapperAccount;
};