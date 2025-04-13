import Header from './components/header/Header';
import HomePage from './pages/HomePage'
import './styles/_index.scss'
import './styles/abstracts/_index.scss'

async function renderApp() {
  const app = document.querySelector("#app");
  if (!app) return;

  app.innerHTML = ""; 

  const header = new Header();  
  const headerElement = await header.render();

  const homePage = await HomePage();  
  if (homePage) {
    app.append(headerElement, homePage);
  }
}

function initApp() {
 renderApp();
}

document.addEventListener("DOMContentLoaded", initApp);