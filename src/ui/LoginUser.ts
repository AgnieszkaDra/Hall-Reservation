import { navigate } from "../router/router";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/form.scss"
import { getCurrentUser } from "../utils/auth";

export const LoginUser = async (): Promise<HTMLElement> => {
  
  const userLog = await getCurrentUser();
 
  const wrapper = document.createElement("div");
  wrapper.className = "loginIcon__wrapper";

  const loginLink = document.createElement("a");
  loginLink.classList.add("loginIcon__link");
  loginLink.setAttribute("id", "loginIcon");
  loginLink.href = "/moje-konto"
  if(userLog) {
    loginLink.href = `/moje-konto/${userLog.name}`;
  }
  
  if (userLog) {
    loginLink.textContent = "Moje konto";
  } else {
    const loginIcon = document.createElement("i");
    loginIcon.classList.add("fas", "fa-user");
    loginIcon.style.fontSize = "1em";
    loginLink.appendChild(loginIcon);
  }

  wrapper.appendChild(loginLink);

  loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    const path = loginLink.getAttribute("href");
    if (path){
      navigate(path);
      return 
    } 
  });

  return wrapper;
};

export default LoginUser;