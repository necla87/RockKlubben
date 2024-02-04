export default async function home() {
  const eventsContainer = $("<div>");

  try {
    // Fetch events data from db.json
    const response = await fetch('db.json');
    const data = await response.json();
    const eventsData = data.events || [];

    // Loop through events and display them
    eventsData.forEach((event, index) => {
      const eventElement = $(`
        <div class="event" data-index="${index}">
          <h2>${event.date} - ${event.time}</h2>
          <p>${event.description}</p>
          <p>Price: ${event.price}</p>
          <p>Scene: ${event.scene}</p>
          <p>Max Capacity: ${event.maxCapacity}</p>
          <button class="book-btn">Book Now</button>
        </div>
      `);

      // Add event listener for the book button
      eventElement.find(".book-btn").on("click", () => {
        showEventDetails(index);
      });

      eventsContainer.append(eventElement);
    });
  } catch (error) {
    console.error('Error reading db.json:', error);
  }

  return eventsContainer;
}

// Function to show event details (you can implement this as needed)
function showEventDetails(index) {
  // Implement details display logic here
}


