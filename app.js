$(document).ready(function () {
  const baseURL = "http://localhost:3000";
  let events; // Define a variable to store events

  // Fetch data from json-server
  function fetchData() {
    $.ajax({
      url: `${baseURL}/events`,
      dataType: 'json',
      success: function (json) {
        events = json; // Store events in the variable
        displayEvents(events);
      }
    });
  }

  // Function to update event data on the server
  function updateEvent(data) {
    $.ajax({
      type: "PUT",
      url: `${baseURL}/events/${data.id}`,
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function () {
        alert('Saved successfully');
      },
    });
  }

  // Function to display events on the page
  function displayEvents(data) {
    $("#app").empty();

    data.forEach(function (event) {
      const eventHtml = `
        <div class="event">
          <h2>${event.title}</h2>
          <p>${event.date} - ${event.time}</p>
          <p>${event.description}</p>
          <p>Price: ${event.price} SEK</p>
          <p>Scene: ${event.scene}</p>
          <button class="reserve-btn" data-id="${event.id}">Book Now</button>
        </div>
      `;
      $("#app").append(eventHtml);
    });

    // Attach click event for "Book Now" buttons
    $(".reserve-btn").on("click", function () {
      const eventId = $(this).data("id");
      console.log("Clicked Book Now for event ID:", eventId); // Add this log
      reserveTicket(eventId);
    });
  }

  // Function to handle the reservation process
  function reserveTicket(eventId) {
    const event = events.find(e => e.id === eventId);

    if (event && event.bookings.length < getMaxCapacity(event.scene)) {
      // Check if reservation page is already loaded
      const isReservationPageLoaded = $("#reservationForm").length > 0;

      if (!isReservationPageLoaded) {
        // Load reservation page
        loadReservationPage(eventId);
      } else {
        alert('Reservation form is already open.');
      }
    } else {
      alert('Sorry, there are no more available tickets for this event!');
    }
  }

  function loadReservationPage(eventId) {
    // Load reservation page with the eventId
    reservationPage(eventId);
  }


  // Function to update event reservation on the server
  function updateEventReservation(eventId, reservation) {
    $.ajax({
      type: "POST",
      url: `${baseURL}/events/${eventId}/bookings`,
      data: JSON.stringify(reservation),
      contentType: 'application/json',
      success: function () {
        alert("Ticket reservation successful!");
        fetchData(); // Refresh data after reservation
      },
    });
  }

  // Initial data fetch
  fetchData();
});
