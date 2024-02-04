let storedCredentials = {
  username: 'admin',
  password: 'admin12345'
};

export async function login(username, password) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if ((username === 'admin' && password === 'admin12345') || (username === storedCredentials.username && password === storedCredentials.password)) {
        // Successful login
        resolve(true);
      } else {
        // Invalid credentials
        resolve(false);
      }
    }, 500); // Simulating a delay for authentication (you can remove this in a real scenario)
  });
}

export function addLogoutEventListener() {
  $("#handleLogout").on("click", async function () {
    await handleLogout();
    window.location.href = "#start"; // Change to the appropriate anchor link for the home page
  });
}

export default async function adminLoginPage() {
  // Implement logic for admin login page

  $(document).ready(function () {
    // Event listener for the login button
    $("#loginBtn").on("click", async function () {
      // Get username and password values from input fields
      const username = $("#username").val();
      const password = $("#password").val();

      // Call the login function with username and password
      const loggedIn = await login(username, password);

      if (loggedIn) {
        // Redirect to admin page on successful login
        window.location.href = "#admin";
      } else {
        // Show an alert or handle invalid credentials as needed
        alert("Invalid username or password");
      }
    });
  });

  return `
    <h1>Admin Login</h1>
    <form id="adminLoginForm">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
      <br>
      <button type="button" id="loginBtn">Login</button>
    </form>
  `;
}
