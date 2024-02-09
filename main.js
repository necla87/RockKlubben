import startPage from './pages/startPage.js';
import adminLoginPage from './pages/adminLoginPage.js';
import reservationPage from './pages/reservationPage.js'; // Add this import

async function handlePageChange() {
  switch (location.hash) {
    case "#login":
      $('main').html(await adminLoginPage());
      break;
    case "#admin":
      $('main').load('pages/adminPage/index.html');
      break;
    case "#reservation": // Handle the reservation page

      $('main').html(await reservationPage(eventId));
      break;
    // Default to the main page
    default:
      $('main').html(await startPage());
      break;
  }
}

window.addEventListener("hashchange", handlePageChange);
window.addEventListener("load", handlePageChange);
