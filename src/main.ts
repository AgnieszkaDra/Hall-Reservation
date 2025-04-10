import HomePage from './pages/HomePage'
import './styles/globals.scss'

async function renderApp() {
  const app = document.querySelector("#app");
  if (!app) return;

  app.innerHTML = ""; 

  const homePage = await HomePage();
  console.log(homePage, 'home page')
  if (homePage) {
    app.append(homePage);
  }
}

function initApp() {
 renderApp();
}

document.addEventListener("DOMContentLoaded", initApp);