import startPage from './pages/startPage.js';
import adminLoginPage from './pages/adminLoginPage.js';
import adminPage from './pages/adminPage.js';

async function handlePageChange() {
  switch (location.hash) {
    case "#login":
      $('main').html(await adminLoginPage());
      break;
    case "#admin":
      $('main').html(await adminPage());
      break;
    // Default to the main page
    default:
      $('main').html(await startPage());
      break;
  }
}

window.addEventListener("hashchange", handlePageChange);
window.addEventListener("load", handlePageChange);
