const route = (event) => {
  event = event || window.event;
  event.preventDefault();

  // Update the URL without refreshing the page
  window.history.pushState({}, "", event.target.href);
  handleLocation(); // Load the content for the new route
};

const routes = {
  404: "/pages/404.html",
  "/": "/pages/home.html",
  "/profile": "/pages/profile.html",
  "/hometown": "/pages/hometown.html",
  "/tourist": "/pages/tourist.html",
  "/food": "/pages/food.html",
};

const handleLocation = async () => {
  // Get the current path
  const path = window.location.pathname;
  
  // Fetch the corresponding HTML file or show the 404 page
  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());
  
  // Inject the fetched HTML into the #main-page element
  document.getElementById("main-page").innerHTML = html;
};

// Listen for back/forward navigation events
window.onpopstate = handleLocation;

// Handle page reloads or direct access to any route
window.route = route;
handleLocation();
