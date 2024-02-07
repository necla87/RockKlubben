import { create } from "../server-request";

export default async function home() {
  const eventsContainer = $("<div>");

  try {
    // Fetch events data from json-server
    const response = await fetch('http://localhost:3000/events');
    const data = await response.json();
    const eventsData = data || [];

    // Loop through events and display them
    eventsData.forEach((event) => {
      const eventElement = $(`
        <div class="eveant">
          <h2>${event.title}</h2>
          <p>${event.date} - ${event.time}</p>
          <p>${event.description}</p>
          <p>Price: ${event.price} SEK</p>
          <p>Scene: ${event.scene}</p>

          <!-- Reservation Form -->
          <form class="reservation-form" id="reservationForm-${event.id}">
            <label for="name-${event.id}">Name:</label>
            <input type="text" id="name-${event.id}" name="name" required>

            <label for="surname-${event.id}">Surname:</label>
            <input type="text" id="surname-${event.id}" name="surname" required>

            <label for="email-${event.id}">Email:</label>
            <input type="email" id="email-${event.id}" name="email" required>

            <label for="mobile-${event.id}">Mobile:</label>
            <input type="tel" id="mobile-${event.id}" name="mobile" required>

            <button class="reserve-btn" data-id="${event.id}">Book Now</button>
          </form>
        </div>
      `);

      // Add event listener for the book button
      eventElement.find(".reserve-btn").on("click", async function () {
        const eventId = $(this).data("id");
        console.log("Clicked Book Now for event ID:", eventId);

        // Access form values based on the event ID
        const name = $(`#name-${eventId}`).val();
        const surname = $(`#surname-${eventId}`).val();
        const email = $(`#email-${eventId}`).val();
        const mobile = $(`#mobile-${eventId}`).val();

        // Create a reservation object
        const reservationData = {
          eventId,
          name,
          surname,
          email,
          mobile,
        };

        try {
          // Use the create function to save the reservation to the server
          const newReservation = await create('bookings', reservationData);
          console.log('Reservation created:', newReservation);
          // Optionally, you can update the UI or show a success message here
        } catch (error) {
          console.error('Error creating reservation:', error);
          // Optionally, you can update the UI or show an error message here
        }
      });

      eventsContainer.append(eventElement);
    });
  } catch (error) {
    console.error('Error reading events data:', error);
  }

  return eventsContainer;
}
