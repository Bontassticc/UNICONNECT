// NAV TOGGLE FOR MOBILE
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navbar = document.getElementById("navbar");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("open");
});

// CHANGE NAV STYLE ON SCROLL
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== TICKETMASTER API =====
const ticketmasterApiKey = "5ooJdSWCZ0yHV2SFYft8JbQHPwUpeWpn"; // replace with your key
const tmEventsContainer = document.getElementById("ticketmaster-events");

if (tmEventsContainer) {
  // Fetch events from Ticketmaster
  fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${ticketmasterApiKey}&countryCode=ZA&size=6&sort=date,asc`)
    .then(response => response.json())
    .then(data => {
      const events = data._embedded?.events || [];
      if (!events.length) {
        tmEventsContainer.innerHTML = "<p>No Ticketmaster events found.</p>";
        return;
      }

      events.forEach(event => {
        // Extract necessary info safely
        const name = event.name || "Unnamed Event";
        const date = event.dates?.start?.localDate || "Date TBD";
        const img = event.images?.[0]?.url || "https://via.placeholder.com/400x250";
        const url = event.url || "#";
        const venue = event._embedded?.venues?.[0]?.name || "Venue TBD";
        const city = event._embedded?.venues?.[0]?.city?.name || "";

        // Create card
        const card = document.createElement("div");
        card.className = "tm-event-card";
        card.innerHTML = `
          <div class="tm-event-image">
            <img src="${img}" alt="${name}">
          </div>
          <div class="tm-event-info">
            <h3>${name}</h3>
            <p>📅 ${date}</p>
            <p>📍 ${venue}, ${city}</p>
            <a href="${url}" target="_blank" class="btn btn-small">More Info</a>
          </div>
        `;
        tmEventsContainer.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Ticketmaster API error:", err);
      tmEventsContainer.innerHTML = "<p>Failed to load Ticketmaster events.</p>";
    });
}
