const baseURL = "http://localhost:3000";
let events; // Define a variable to store events

// Fetch data from json-server
export function fetchData() {
  $.ajax({
    url: `${baseURL}/events`,
    dataType: 'json',
    success: function (json) {
      events = json; // Store events in the variable
      displayEvents(events); // Call displayEvents to render events on the start page
    },
    error: function (xhr, status, error) {
      console.error('Error fetching events:', error);
    }
  });
}

// Placeholder function for updating event data on the server
export function updateEvent(data) {
  $.ajax({
    type: "PUT",
    url: `${baseURL}/events/${data.id}`,
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function () {
      alert('Saved successfully');
    },
    error: function (xhr, status, error) {
      console.error('Error updating event:', error);
    }
  });
}

// Function to update event reservation
export async function updateEventReservation(eventId, reservation) {
  try {
    const response = await fetch(`${baseURL}/events/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservation),
    });

    if (response.ok) {
      alert('Ticket reservation updated successfully');
    } else {
      throw new Error('Failed to update ticket reservation');
    }
  } catch (error) {
    console.error('Error updating ticket reservation:', error);
    alert('Failed to update ticket reservation');
  }
}

// Function to display events on the page
function displayEvents(data) {
  const eventsContainer = $("<div>");

  data.forEach((event) => {
    const eventElement = $(`
      <div class="event">
        <h2>${event.title}</h2>
        <p>${event.date} - ${event.time}</p>
        <p>${event.description}</p>
        <p>Price: ${event.price} SEK</p>
        <p>Scene: ${event.scene}</p>
        <button class="reserve-btn" data-id="${event.id}">Book Now</button>
      </div>
    `);

    eventsContainer.append(eventElement);
  });

  $("#app").html(eventsContainer); // Render events on the start page

  // Attach click event for "Book Now" buttons
  $(".reserve-btn").on("click", function () {
    const eventId = $(this).data("id");
    console.log("Clicked Book Now for event ID:", eventId);
    window.location.hash = `reservation#${eventId}`; // Navigate to the reservation page with eventId
  });
}
