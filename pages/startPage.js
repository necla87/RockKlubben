export default async function home() {
  const eventsContainer = $("<div>");

  try {
    // Fetch events data from json-server
    const response = await fetch('http://localhost:3000/events'); // Update the URL to match your server
    const data = await response.json();
    const eventsData = data || [];

    // Loop through events and display them
    eventsData.forEach((event, index) => {
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
      eventElement.find(".book-btn").on("click", () => {
        showEventDetails(index);
      });

      eventsContainer.append(eventElement);
    });
  } catch (error) {
    console.error('Error reading events data:', error);
  }

  return eventsContainer;
}

// Function to show event details (you can implement this as needed)
function showEventDetails(index) {
  // Implement details display logic here
}


