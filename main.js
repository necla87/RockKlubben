import admin from './pages/admin.js';
import home from './pages/home.js';
import booking from './pages/booking.js'; // Yeni ekledik

async function router() {
  // const events = await getEvents();

  switch (location.hash) {
  
    case "#booking":
      $('main').html(await booking(events)); // Etkinlikleri rezervasyon sayfasına gönderiyoruz
      break;
    case "#admin":
      $('main').html(await admin());
      break;
    case "#home":
    default:
      $('main').html(await home());
  }
}
