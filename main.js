import home from './pages/home.js';
import admin from './pages/admin.js';

// Function to handle page content based on the hash
async function handlePageChange() {
  switch (location.hash) {
    case "#admin":
      $('main').html(await admin());
      break;
    // Add other cases for different pages as needed
    default:
      $('main').html(await home());
      break;
  }
}
// Event listener for hash changes
window.addEventListener("hashchange", handlePageChange);

// Event listener for initial page load
window.addEventListener("load", handlePageChange);
