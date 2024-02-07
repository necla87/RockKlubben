import { update, getAll, create, remove } from "../server-request.js";

export default function adminPage() {
  return `
    <div id="admin">
      <div id="adminButtons">
        <button style="border-radius: 8px; " id="adminViewBookings">View All Bookings</button>
        <button style="border-radius: 8px; " id="adminCreateEvent">Create New Event</button>
        <button style="border-radius: 8px; " id="adminEditEvent">Edit Event</button>
        <button style="border-radius: 8px; " id="adminDeleteEvent">Delete Event</button>
        <button style="border-radius: 8px; " id="handleLogout">Logout</button>
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
          $("#adminInfoContainer").html('<div style="padding: 20px; background-color: #f8f8f8; border: 1px solid #ddd;"><h2>' + title + '</h2>${getAllBookings()}</div>');
        }
      </script>
    </div>
  `;
}

// The rest of your functions remain unchanged...


export async function getAllBookings() {
  const bookingsContainer = $("<div>");
  const data = await getAll("bookings");

  console.log({ data });

  data.forEach((booking) => {
    const bookingElement = $(`<div class="booking">
      <h2>${booking.name}</h2>
      <p>${booking.surname}</p>
      <p>${booking.email}</p>
      <p>${booking.mobile}</p>
    </div>`)

    bookingsContainer.append(bookingElement)
  })

  return bookingsContainer;
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
