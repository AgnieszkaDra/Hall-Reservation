import { AdminPage, NotFoundPage } from "../pages/pages";
import { AuthFormWrapper } from "../components/form/AuthFormWrapper";
import UserAccount from "../components/sections/UserAccount";
import { Account } from "../panels/Account";
import { email, password } from "../ui/fields/formFields";

type Route = {
  path: string;
  page?: () => string;
  component?: (param?: string) => Promise<string | HTMLElement>;
};

const routes: Route[] = [
  { path: "/admin", page: AdminPage },
  { path: "/moje-konto", component: () => Account({ type: 'login', fields: [email, password] }) },
  //{ path: "/moje-konto", component: async () => (new AuthFormWrapper('email')).render() },
  { path: "/moje-konto/:path", component: () => UserAccount() }, // Dynamic route
];

function matchRoute(path: string): { route: Route; param?: string } | undefined {
  for (const route of routes) {
    if (!route.path.includes(":")) {
      console.log(route.path, path, 'path teraz')
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
  console.log(matched, 'matched route')
  if (!matched) {
    // If no route matches, load NotFoundPage
    content.innerHTML = NotFoundPage();
    return;
  }

  const { route, param } = matched;

  try {
    content.innerHTML = ""; // Clear the existing content

    if (route.component) {
      const component = await route.component(param);

      // Handle component rendering (string or HTMLElement)
      if (typeof component === "string") {
        content.innerHTML = component;
      } else {
        content.appendChild(component);
      }
    }

    // Update the browser's URL
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("locationChange"));
  } catch (error) {
    console.error("Error loading component:", error);
    content.innerHTML = NotFoundPage(); // Fallback to NotFoundPage in case of error
  }
}

// Listen for the initial page load and navigate accordingly
document.addEventListener("DOMContentLoaded", () => navigate(window.location.pathname));

// Handle navigation triggered by links or browser history state change
window.addEventListener("popstate", () => {
  navigate(window.location.pathname);
});