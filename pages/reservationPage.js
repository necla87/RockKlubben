import updateEventReservation from './startPage.js';

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
      const reservation = { name, surname, email, mobile };
      updateEventReservation(eventId, reservation);
      $("#reservationForm").remove(); // Remove the reservation form after submission
      alert("Ticket reservation successful!");
    } else {
      alert("Please fill in all information!");
    }
    
  });
}
