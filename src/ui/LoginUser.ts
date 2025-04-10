import { navigate } from "../router/router";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/form.scss";
import { getCurrentUser } from "../utils/auth";
import { LoginLink } from "./LoginLink";

export const LoginUser = async (): Promise<HTMLElement> => {
  const userLog = await getCurrentUser();

  const wrapper = document.createElement("div");
  wrapper.className = "loginIcon__wrapper";

  const linkHref = userLog ? `/moje-konto/${userLog.name}` : "/moje-konto";
  const linkText = userLog ? "Moje konto" : "";
  const iconClass = userLog ? undefined : "fas fa-user";

  const loginLink = LoginLink({
    text: linkText,
    icon: iconClass,
    href: linkHref,
    className: "link__login--icon",
    headingLevel: "h5",
  });

  loginLink.setAttribute("id", "loginIcon");

  wrapper.appendChild(loginLink);

  loginLink.addEventListener("click", (event: MouseEvent) => {
    event.preventDefault();
    const path = loginLink.getAttribute("href");
    if (path) {
      navigate(path);
    }
  });

  return wrapper;
};

export default LoginUser;