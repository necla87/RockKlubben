// import updateEventReservation from './startPage.js';

export default async function reservationPage(eventId) {
  const reservationContainer = $("<div>");

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

  reservationContainer.html(reservationForm);

  $("#app").html(reservationContainer);

  $("#submitReservation").on("click", function () {
    const name = $("#name").val();
    const surname = $("#surname").val();
    const email = $("#email").val();
    const mobile = $("#mobile").val();

    if (name && surname && email && mobile) {
      const reservation = { eventId, name, surname, email, mobile };
      // updateReservation(eventId, reservation);
      updateReservation(reservation, eventId);
      $("#reservationForm").remove(); // Remove the reservation form after submission
      alert("Ticket reservation successful!");
    } else {
      alert("Please fill in all information!");
    }

  });

}

function updateReservation(reservation,) {
  fetch(`http://localhost:3000/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      reservation
    )
  }).then(response => response.json())
    .then(console.log(newPerson))
}



