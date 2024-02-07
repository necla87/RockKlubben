import { fetchData } from '../app.js'; // Assuming you've defined a function named fetchData in app.js

export default async function reservationPage(eventId) {
  try {
    // Fetch data
    const events = await fetchData(); // Assuming fetchData retrieves events data

    // Check if events array is defined and not empty
    if (!events || events.length === 0) {
      throw new Error('Events array is undefined or empty');
    }

    // Find the event with the specified ID
    const event = events.find(e => e.id === eventId);

    // Check if event is found
    if (!event) {
      throw new Error(`Event with ID ${eventId} not found`);
    }

    // Display reservation form and handle submission
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

    $("#submitReservation").on("click", async function () {
      const name = $("#name").val();
      const surname = $("#surname").val();
      const email = $("#email").val();
      const mobile = $("#mobile").val();

      if (name && surname && email && mobile) {
        const reservation = { name, surname, email, mobile };
        // Update event reservation
        await updateEventReservation(eventId, reservation);
        // Refresh events after reservation update
        const updatedEvents = await fetchData();
        displayEvents(updatedEvents);
        $("#reservationForm").remove(); // Remove the reservation form after submission
        alert("Ticket reservation successful!");
        window.location.href = "http://localhost:5500/index.html"; // Navigate back to the start page
      } else {
        alert("Please fill in all information!");
      }
    });
  } catch (error) {
    console.error('Error on reservation page:', error);
    alert('Error occurred while processing reservation');
  }
}
