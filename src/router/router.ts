import { AdminPage, NotFoundPage } from "../pages/pages";
import { AuthFormWrapper } from "../components/form/AuthFormWrapper";
import UserAccount from "../components/sections/UserAccount";

type Route = {
  path: string;
  page?: () => string;
  component?: (param?: string) => Promise<string | HTMLElement>;
};

const routes: Route[] = [
  { path: "/admin", page: AdminPage },
  { path: "/moje-konto", component: async () => (new AuthFormWrapper('login')).render() },
  { path: "/moje-konto/:path", component: () => UserAccount() }, 
];

function matchRoute(path: string): { route: Route; param?: string } | undefined {
  for (const route of routes) {
    if (!route.path.includes(":")) {
      if (route.path === path) return { route };
    } else {
      const pattern = new RegExp(`^${route.path.replace(/:(\w+)/g, "([^/]+)")}$`);
      const match = path.match(pattern);

      if (match) {
        return { route, param: match[1] };
      }
    }
  }
  return undefined;
}

export async function navigate(path: string) {
  const content = document.getElementById("app");
  if (!content) return;

  const matched = matchRoute(path);
  if (!matched) {
    content.innerHTML = NotFoundPage();
    return;
  }

  const { route, param } = matched;

  try {
    content.innerHTML = "";
    if (route.component) {
      const component = await route.component(param);
      if (typeof component === "string") {
        content.innerHTML = component;
      } else {
        content.appendChild(component);
      }
    }
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("locationChange"));
  } catch (error) {
    console.error("Error loading component:", error);
    content.innerHTML = NotFoundPage();
  }
}

document.addEventListener("DOMContentLoaded", () => navigate(window.location.pathname));




