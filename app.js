$(document).ready(function () {
  const baseURL = "http://localhost:3000";

  // Dummy data for events
  const events = [
    { id: 1, date: "2024-02-01", time: "19:00", price: 100, scene: "Rökrock", description: "Lorem ipsum", bookings: [] },
    // Add more events as needed
  ];

  // Fetch data from json-server
  function fetchData() {
    $.ajax({
      url: `${baseURL}/events`, // Assuming events are stored at the /events endpoint
      dataType: 'json',
      success: function (json) {
        console.log(json);
        displayEvents(json);
      }
    });
  }

  function updateEvent(data) {
    $.ajax({
      type: "PUT", // Assuming you are updating an existing event, change it to "POST" if needed
      url: `${baseURL}/events/${data.id}`, // Adjust the URL based on your API structure
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function () {
        alert('Saved successfully');
      },
    });
  }

  // Display events on the page
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

    // Add event listener for reserve button
    $(".reserve-btn").on("click", function () {
      const eventId = $(this).data("id");
      reserveTicket(eventId);
    });
  }

  // Reserve tickets for an event
  function reserveTicket(eventId) {
    const event = events.find(e => e.id === eventId);

    if (event && event.bookings.length < getMaxCapacity(event.scene)) {
      const name = prompt("Name:");
      const surname = prompt("Surname:");
      const email = prompt("Email:");
      const mobile = prompt("Mobile:");

      if (name  && surname && email && mobile) {
        const reservation = { name  , surname, email, mobile  };
        event.bookings.push(reservation);
        alert("Ticket reservation successful!");
        fetchData(); // Refresh data after reservation
        updateEvent(event);
      } else {
        alert("Please fill in all information!");
      }
    } else {
      alert("Sorry, there are no more available tickets for this event!");
    }
  }

  // Get maximum capacity based on scene
  function getMaxCapacity(scene) {
    switch (scene) {
      case "Rökrock":
        return 250;
      case "Trenchcoat":
        return 500;
      case "Långrock":
        return 700;
      default:
        return 0;
    }
  }

  // Fetch initial data
  fetchData();
});