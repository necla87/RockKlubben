import { update, getAll, create, remove } from "../server-request.js";




export default function adminPage() {
  const adminPage = `
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
          ${displayCreateEvent()}
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
          $("#adminInfoContainer").html('<div id="display-parent" style="padding: 20px; background-color: #f8f8f8; border: 1px solid #ddd;"><h2>' + title + '</h2></div>');
        }

      </script>
    </div>
`;

  return adminPage;

}




export async function getAllBookings() {
  const bookingsContainer = $("<div>");
  const data = await getAll("bookings");

  console.log({ data });

  data.forEach((booking) => {
    const bookingElement = $(`<div class="booking">
      <h2>${booking.name}< /h2>
      <p>${booking.surname}</p>
      <p>${booking.email}</p>
      <p>${booking.mobile}</p>
    </div>`)

    bookingsContainer.append(bookingElement)
  })

  $('#display-parent').append(bookingsContainer);
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

function displayCreateEvent() {

  const displayParent = $("#display-parent");
  console.log('displayed here')

  const createEventForm = `
    <div id="createEventForm">
      <h2>Create New Event</h2>
      <form id="createEventForm">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" required>
        <br>
        <label for="date">Date:</label>
        <input type="date" id="date" name="date" required>
        <br>
        <label for="time">Time:</label>
        <input type="time" id="time" name="time" required>
        <br>
        <label for="description">Description:</label>
        <textarea id="description" name="description" required></textarea>
        <br>
        <label for="price">Price:</label>
        <input type="number" id="price" name="price" required>
        <br>
        <label for="scene">Scene:</label>
        <input type="text" id="scene" name="scene" required>
        <br>
        <button type="button" id="submitEvent">Create Event</button>
      </form>
    </div>
  `;

  // displayParent.append(createEventForm);

  // insert the form intto the displayParent
  displayParent.append(createEventForm);

  // ad event listener for the submit button and first check if the form is valid then make a request to the server
  $("#submitEvent").on("click", function () {
    const title = $("#title").val();
    const date = $("#date").val();
    const time = $("#time").val();
    const description = $("#description").val();
    const price = $("#price").val();
    const scene = $("#scene").val();

    if (title && date && time && description && price && scene) {
      const newEvent = { title, date, time, description, price, scene };
      createEvent(events, newEvent);
      $("#createEventForm").remove(); // Remove the form after submission
      alert("Event created successfully!");
    } else {
      alert("Please fill in all information!");
    }
  })
}









