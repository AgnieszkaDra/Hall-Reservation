import HomePage from './pages/HomePage'

function renderApp() {
  const app = document.querySelector("#app");
  if (!app) return;

  app.innerHTML = ""; 

  const homePage = HomePage();
  app.append(homePage);
}

function initApp() {
 renderApp();
}

document.addEventListener("DOMContentLoaded", initApp);
