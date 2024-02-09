// startPage.js
import reservationPage from './reservationPage.js';



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
        <div class="event">
          <h2>${event.title}</h2>
          <p>${event.date} - ${event.time}</p>
          <p>${event.description}</p>
          <p>Price: ${event.price} SEK</p>
          <p>Scene: ${event.scene}</p>
          <button class="reserve-btn" data-id="${event.id}">Book Now</button>
        </div>
      `);

      // Add event listener for the book button
      eventElement.find(".reserve-btn").on("click", function () {
        const eventId = $(this).data("id");
        console.log("Clicked Book Now for event ID:", eventId);
        reservationPage(eventId); // Navigate to reservation page
      });

      eventsContainer.append(eventElement);
    });
  } catch (error) {
    console.error('Error reading events data:', error);
  }

  return eventsContainer;
}
