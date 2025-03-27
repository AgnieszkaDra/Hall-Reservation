import { navigate } from "../router/router";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/form.scss"

export const LoginUser = async (icon?: "text" | "user"): Promise<HTMLElement> => {
 

  const wrapper = document.createElement("div");
  wrapper.className = "loginIcon__wrapper";

  const loginLink = document.createElement("a");
  loginLink.classList.add("loginIcon__link");
  loginLink.setAttribute("id", "loginIcon");
  loginLink.href = "/moje-konto";

  if (icon === "text") {
  } else if (icon === "user") {
    const loginIcon = document.createElement("i");
    loginIcon.classList.add("fas", "fa-user");
    loginIcon.style.fontSize = "1em";
    loginLink.appendChild(loginIcon);
  }

  wrapper.appendChild(loginLink);

  loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    const path = loginLink.getAttribute("href");
    console.log(path)
    if (path) navigate(path);
  });

  return wrapper;
};

export default LoginUser;