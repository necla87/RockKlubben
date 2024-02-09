import reservationPage from "./pages/reservationPage";

$(document).ready(function () {
  const baseURL = "http://localhost:3000";
  let events;

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

    $(".reserve-btn").on("click", function () {
      const eventId = $(this).data("id");
      console.log("Clicked Book Now for event ID:", eventId); // Add this log
      reservationPage(eventId);
    });
  }

  fetchData();
});

