import userList from '../../fields/userList';
import "@fortawesome/fontawesome-free/css/all.min.css";
import '../../styles/main.scss';
import { getCurrentUser } from '../../utils/auth';
import createTitle from '../../typography/createTitle';
import { LoginLink } from '../../ui/LoginLink';

export const UserAccount = async (): Promise<HTMLElement> => {
  const container = document.createElement('div');
  container.className = 'container';

  const userLog = await getCurrentUser();

  const wrapper = document.createElement('div');
  wrapper.className = 'account';

  const panel = document.createElement('nav');
  panel.className = 'account__panel';

  const user = document.createElement('div');
  user.className = 'account__user';

  const loginIconWrapper = document.createElement('div');
  loginIconWrapper.className = 'account__user-icon';

  const loginIcon = document.createElement("i");
  loginIcon.classList.add("fas", "fa-user");
  loginIcon.style.fontSize = "1em";
  loginIconWrapper.appendChild(loginIcon);

  const userInfo = document.createElement('div');
  userInfo.className = 'account__user-info';
  userInfo.textContent = userLog ? `Witaj, ${userLog.name}` : "Witaj, Gościu";

  user.append(loginIconWrapper, userInfo);
  panel.appendChild(user);

  const titles: Record<string, string> = {
    '/moje konto/reservation': 'Rezerwacje',
    '/moje konto/details': 'Szczegóły konta',
    '/': 'Strona główna',
  };

  const currentPath = decodeURIComponent(window.location.pathname);
  const titleText = titles[currentPath] || 'Moje konto';
  const title = createTitle('h2', titleText, 'title');

  const panelList = document.createElement('ul');
  panelList.className = 'account__list';

  userList.forEach(item => {
    const listItem = document.createElement('li');
    listItem.className = 'account__item';

    const link = LoginLink({
      text: item.name,
      href: item.href,
      className: 'account__link',
      headingLevel: 'span', 
    });

    link.addEventListener("click", (event: MouseEvent) => {
      if (item.name !== "Strona główna") {
        if (item.name === 'Wyloguj') {
          localStorage.removeItem("currentUser");
        }
      }
    });

    listItem.appendChild(link);
    panelList.appendChild(listItem);
  });

  panel.appendChild(panelList);
  wrapper.append(panel);
  container.append(title, wrapper);

  return container;
};

export default UserAccount;