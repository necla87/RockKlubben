$(document).ready(function () {
  const baseURL = "http://localhost:3000";

  // Fetch data from json-server
  function fetchData() {
    $.ajax({
      url: `${baseURL}/events`,
      dataType: 'json',
      success: function (json) {
        displayEvents(json);
      }
    });
  }

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

  function displayEvents(data) {
    $("#app").empty();

    data.forEach(function (event) {
      const eventHtml = `
        <div class="event">
          <h2>${event.date} - ${event.scene}</h2>
          <p>${event.description}</p>
          <p>Time: ${event.time}</p>
          <p>Price: ${event.price} SEK</p>
          <button class="reserve-btn" data-id="${event.id}">Reserve Tickets</button>
        </div>
      `;
      $("#app").append(eventHtml);
    });

    $(".reserve-btn").on("click", function () {
      const eventId = $(this).data("id");
      reserveTicket(eventId);
    });
  }

  function reserveTicket(eventId) {
    const name = prompt("Name:");
    const surname = prompt("Surname:");
    const email = prompt("Email:");
    const mobile = prompt("Mobile:");

    if (name && surname && email && mobile) {
      const reservation = { name, surname, email, mobile };
      updateEventReservation(eventId, reservation);
    } else {
      alert("Please fill in all information!");
    }
  }

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

  fetchData();
});
