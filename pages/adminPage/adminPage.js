import { getAll, create, remove, update } from "../../server-request.js";

const container = $("#adminInfoContainer");

const eventForm = `
<div id="createEventForm" style="max-width: 400px; margin: 0 auto;">
<form id="createEventForm" style="display: flex; flex-direction: column; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">

    <label for="title">Title:</label>
    <input type="text" id="title" name="title" required style="margin-bottom: 10px;">
    
    <label for="date">Date:</label>
    <input type="date" id="date" name="date" required style="margin-bottom: 10px;">
    
    <label for="time">Time:</label>
    <input type="time" id="time" name="time" required style="margin-bottom: 10px;">
    
    <label for="description">Description:</label>
    <textarea id="description" name="description" required style="margin-bottom: 10px;"></textarea>
    
    <label for="price">Price:</label>
    <input type="number" id="price" name="price" required style="margin-bottom: 10px;">
    
    <label for="scene">Scene:</label>
    <input type="text" id="scene" name="scene" required style="margin-bottom: 10px;">
    
    <button type="button" id="submitEvent" style="background-color: #4CAF50; color: white; padding: 10px; border: none; cursor: pointer;">Create Event</button>
</form>
</div>
`;

$("#adminViewBookings").on("click", function () {
  displayInfo("View All Bookings");
  displayAllBookings()
});

$("#adminCreateEvent").on("click", function () {
  displayInfo("Create New Event");
  displayCreateEventForm()
});

$("#adminEditEvent").on("click", function () {
  displayInfo("Edit Event");
  displayEditEventForm()
});

$("#adminDeleteEvent").on("click", function () {
  displayInfo("Delete Event");
  displayDeleteEvent()
});

$("#handleLogout").on("click", async function () {
  window.location.href = "#start"; // Change to the appropriate anchor link for the home page
});

function displayInfo(title) {
  // Update the container with the selected title and add some styling
  $("#adminInfoContainer").html('<div id="display-parent" style="padding: 20px; background-color: #f8f8f8; border: 1px solid #ddd;"><h2>' + title + '</h2></div>');
}

async function displayAllBookings() {
  const bookingsContainer = $(`<div style="border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;"
  >`);

  const data = await getAll('bookings')

  data.forEach((booking) => {
    const bookingElement = `
      <div style="margin: 8px; padding: 16px; background-color: lightskyblue; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <p style="font-weight: bold; margin-bottom: 8px;">${booking.name} ${booking.surname}</p>
      <p style="margin-bottom: 4px;">Email: ${booking.email}</p>
      <p style="margin-bottom: 4px;">Mobile: ${booking.mobile}</p>
      </div>  
      `
    bookingsContainer.append(bookingElement)
  })
  $('#display-parent').append(bookingsContainer);

}

function displayCreateEventForm() {
  const displayParent = $("#display-parent");

  displayParent.append(eventForm);

  $("#submitEvent").on("click", function () {
    const title = $("#title").val();
    const date = $("#date").val();
    const time = $("#time").val();
    const description = $("#description").val();
    const price = $("#price").val();
    const scene = $("#scene").val();

    if (title && date && time && description && price && scene) {
      const newEvent = { title, date, time, description, price, scene };
      create("events", newEvent)
      $("#createEventForm").remove(); // Remove the form after submission
      alert("Event created successfully!");
    } else {
      alert("Please fill in all information!");
    }
  })
}

async function displayEditEventForm() {
  const eventsContainer = $(`<div style="border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;"
  >`);

  const displayParent = $("#display-parent");
  const events = await getAll('events')

  events.forEach((event) => {
    const eventElement = `
  <div style="margin: 8px; padding: 16px; background-color: lightskyblue; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
  <p style="font-weight: bold; margin-bottom: 8px;">Event: ${event.title}</p>
  <p style="margin-bottom: 8px;">Scene: ${event.scene}</p>
  <p style="margin-bottom: 4px;">Date: ${event.date}</p>
  <p style="margin-bottom: 4px;">Time: ${event.time}</p>
  <p style="margin-bottom: 4px;">Price: ${event.price}</p>
  <button id="editEvent-${event.id}" style="background-color: #4CAF50; color: white; padding: 10px; border: none; cursor: pointer;">Edit</button>
  </div>  
  `
    eventsContainer.append(eventElement)

    displayParent.on("click", `#editEvent-${event.id}`, function () {
      eventsContainer.remove()
      displayParent.append(eventForm)

      $("#title").val(event.title);
      $("#date").val(event.date);
      $("#time").val(event.time);
      $("#description").val(event.description);
      $("#price").val(event.price);
      $("#scene").val(event.scene);
      $("#submitEvent").html("Update")

      $("#submitEvent").on("click", function () {
        const title = $("#title").val();
        const date = $("#date").val();
        const time = $("#time").val();
        const description = $("#description").val();
        const price = $("#price").val();
        const scene = $("#scene").val();

        if (title && date && time && description && price && scene) {
          const updatedEvent = { title, date, time, description, price, scene };
          update("events", event.id, updatedEvent)
          $("#createEventForm").remove();
          alert("Event created successfully!");
        } else {
          alert("Please fill in all information!");
        }

      });

    })
    $('#display-parent').append(eventsContainer);
  })
}

async function displayDeleteEvent() {
  const eventsContainer = $(`<div style="border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;"
  >`);

  const displayParent = $("#display-parent");
  const events = await getAll('events')

  events.forEach((event) => {
    const eventElement = `
  <div style="margin: 8px; padding: 16px; background-color: lightskyblue; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
  <p style="font-weight: bold; margin-bottom: 8px;">Event: ${event.title}</p>
  <p style="margin-bottom: 8px;">Scene: ${event.scene}</p>
  <p style="margin-bottom: 4px;">Date: ${event.date}</p>
  <p style="margin-bottom: 4px;">Time: ${event.time}</p>
  <p style="margin-bottom: 4px;">Price: ${event.price}</p>
  <button type="button" id="editEvent-${event.id}" style="background-color: #4CAF50; color: white; padding: 10px; border: none; cursor: pointer;">Delete</button>
  </div>  
  `
    eventsContainer.append(eventElement)

    displayParent.on("click", `#editEvent-${event.id}`, async function () {
      await remove("events", event.id);


    });

  })
  $('#display-parent').append(eventsContainer);

}
