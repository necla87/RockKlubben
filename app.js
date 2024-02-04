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
      reserveTicket(eventId);
    });
  }


  function reserveTicket(eventId) {
    const reservationForm = `
    <div id="reservationForm">
      <h2>Reservation Information</h2>
      <form id="reservationForm">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        <br>
        <label for="surname">Surname:</label>
        <input type="text" id="surname" name="surname" required>
        <br>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <br>
        <label for="mobile">Mobile:</label>
        <input type="tel" id="mobile" name="mobile" required>
        <br>
        <button type="button" id="submitReservation">Submit Reservation</button>
      </form>
    </div>
  `;

    $("#adminInfoContainer").html(reservationForm);

    // Use event delegation to handle the click event
    $("#adminInfoContainer").on("click", "#submitReservation", function () {
      const name = $("#name").val();
      const surname = $("#surname").val();
      const email = $("#email").val();
      const mobile = $("#mobile").val();

      if (name && surname && email && mobile) {
        const reservation = { name, surname, email, mobile };
        updateEventReservation(eventId, reservation);
        $("#reservationForm").remove(); // Remove the reservation form after submission
      } else {
        alert("Please fill in all information!");
      }
    });
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
