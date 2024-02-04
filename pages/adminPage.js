import { update, getAll, create, remove } from "../server-request.js";

export default async function adminPage() {
  return `
    <div id="admin">
      <div id="adminButtons">
        <button id="adminViewBookings">View All Bookings</button>
        <button id="adminCreateEvent">Create New Event</button>
        <button id="adminEditEvent">Edit Event</button>
        <button id="adminDeleteEvent">Delete Event</button>
        <button id="handleLogout">Logout</button>
      </div>
      <div id="adminInfoContainer"></div>

      <script>
        $("#adminViewBookings").on("click", function () {
          displayInfo("View All Bookings");
        });

        $("#adminCreateEvent").on("click", function () {
          displayInfo("Create New Event");
        });

        $("#adminEditEvent").on("click", function () {
          displayInfo("Edit Event");
        });

        $("#adminDeleteEvent").on("click", function () {
          displayInfo("Delete Event");
        });

        // Add event listener for logout
        $("#handleLogout").on("click", async function () {
          await handleLogout();
          window.location.href = "#start"; // Change to the appropriate anchor link for the home page
        });

        function displayInfo(title) {
          // Update the container with the selected title and add some styling
          $("#adminInfoContainer").html('<div style="padding: 20px; background-color: #f8f8f8; border: 1px solid #ddd;"><h2>' + title + '</h2></div>');
        }
      </script>
    </div>
  `;
}

// The rest of your functions remain unchanged...


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
