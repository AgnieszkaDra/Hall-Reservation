import LoginUser from "../../ui/LoginUser.ts";

export const AccountSection = async (
  type?: "login" | "both",
  icon?: "text" | "user"
): Promise<HTMLElement> => {
  const wrapperAccount = document.createElement("div");
  wrapperAccount.className = "account__wrapper";

  if (type === "login" || type === "both") {
    const loginEl = await LoginUser(icon);
    wrapperAccount.appendChild(loginEl);
  }

  return wrapperAccount;
};