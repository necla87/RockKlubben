import { update, getAll, create, remove } from "../server-request.js";
import { addLogoutEventListener } from "./adminLoginPage.js";

export default async function adminPage() {
  return `
    <div id="admin">
      <h1>Admin sida</h1>

      <div id="adminLogIn">
        <button id="adminViewBookings">Tüm Rezervasyonları Görüntüle</button>
        <br>

        <button id="adminCreateEvent">Yeni Etkinlik Oluştur</button>
        <br>

        <button id="adminEditEvent">Etkinliği Düzenle</button>
        <br>

        <button id="adminDeleteEvent">Etkinliği Sil</button>
        <br>

        <button id="handleLogout">Logga ut</button>
        <br>
      </div>

      <script>
        $("#adminViewBookings").on("click", function () {
          window.location.href = "#allBookings";
        });

        $("#adminCreateEvent").on("click", function () {
          window.location.href = "#createEvent";
        });

        $("#adminEditEvent").on("click", function () {
          window.location.href = "#editEvent";
        });

        $("#adminDeleteEvent").on("click", function () {
          window.location.href = "#deleteEvent";
        });

        // Add event listener for logout
        $("#handleLogout").on("click", async function () {
          await handleLogout();
          window.location.href = "#start"; // Change to the appropriate anchor link for the home page
        });
      </script>
    </div>
  `;
}

export async function getAllBookings() {
  const allEvents = await getAll("events");
  const allBookings = allEvents.flatMap((event) => event.bookings);
  return allBookings;
}

export async function createEvent(newEvent) {
  await create("events", newEvent);
}

export async function updateEvent(eventId, updatedData) {
  await update("events", eventId, "data", updatedData);
}

export async function deleteEvent(eventId) {
  await remove("events", eventId);
}

export async function viewAllBookings() {
  const allBookings = await getAllBookings();
  console.log(allBookings);
  // Do something with the fetched bookings, e.g., display them in the UI
  // You can modify this part based on your requirements
}
