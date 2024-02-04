// main.js
import startPage from './pages/startPage.js';
import adminLoginPage from './pages/adminLoginPage.js';
import adminPage from './pages/adminPage.js';
import reservationPage from './pages/reservationPage.js'; // Add this import

async function handlePageChange() {
  switch (location.hash) {
    case "#login":
      $('main').html(await adminLoginPage());
      break;
    case "#admin":
      $('main').html(await adminPage());
      break;
    case "#reservation": // Handle the reservation page
      // Implement the logic to extract eventId from the URL or use a global variable
      const eventId = extractEventIdFromUrl(); // Implement this function
      $('main').html(await reservationPage(eventId));
      break;
    // Default to the main page
    default:
      $('main').html(await startPage());
      break;
  }
}

function extractEventIdFromUrl() {
  // Implement the logic to extract eventId from the URL
  // You can use location.hash or any other method based on your URL structure
}

window.addEventListener("hashchange", handlePageChange);
window.addEventListener("load", handlePageChange);
