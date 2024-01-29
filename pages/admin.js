
import { update, getOne, getAll, create, remove } from "../server-request.js";

export default async function admin() {
  if (await checkLogIn()) {
    window.location.href = "#login";
  }

  return (`
    <div id="admin">
      <h1>Admin sida</h1>

      <div id="adminLogIn">
        <button id="adminViewBookings" onclick="viewAllBookings()">Tüm Rezervasyonları Görüntüle</button>
        <br>

        <button id="adminCreateEvent" onclick="createNewEvent()">Yeni Etkinlik Oluştur</button>
        <br>

        <button id="adminEditEvent" onclick="editEvent()">Etkinliği Düzenle</button>
        <br>

        <button id="adminDeleteEvent" onclick="deleteEvent()">Etkinliği Sil</button>
        <br>

        <button id="handleLogout">Logga ut</button>
        <br>
      </div>

      <script>
        function viewAllBookings() {
          window.location.href = "#allBookings";
        }

        function createNewEvent() {
          window.location.href = "#createEvent";
        }

        function editEvent() {
          window.location.href = "#editEvent";
        }

        function deleteEvent() {
          window.location.href = "#deleteEvent";
        }
      </script>
    </div>
  `);
}

export function addLogoutEventListener() {
  $("#handleLogout").on("click", async function () {
    await handleLogout();
    window.location.href = "#login";
  });
}

export async function handleLogout() {
  await update("admin", 1, "logIn", 0);
}

export async function getAllBookings() {
  const allEvents = await getAll("events");
  const allBookings = allEvents.flatMap(event => event.bookings);
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

async function checkLogIn() {
  const user = await getOne("admin", 1);
  return user.logIn === 0;
}
