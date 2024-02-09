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

  // Initial data fetch
  fetchData();
});
