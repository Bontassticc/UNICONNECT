// Get DOM elements
const searchBar = document.getElementById("searchBar");
const filterCategory = document.getElementById("filterCategory");
const eventsList = document.getElementById("events-list");

// Event Data
const eventsData = [
  {
    name: "Campus Music Night",
    category: "social",
    desc: "Join us for live music by student bands & DJs under the stars!",
    date: "2025-11-12",
    location: "Wits University",
    img: "../Images/Party.jpg"
  },
  {
    name: "Career Fair 2025",
    category: "academic",
    desc: "Meet recruiters from top companies and learn how to stand out!",
    date: "2025-11-15",
    location: "Wits University",
    img:"../Images/Career Fair.jpg"
  },
  
  {
    name: "Movie Under the Stars",
    category: "social",
    desc: "Outdoor cinema night with popcorn, beanbags, and fairy lights!",
    date: "2025-11-20",
    location: "University of Pretoria",
    img: "../Images/Movie under the stars.jpg"
  },
  
  {
    name: "Coding Hackathon: Build for Change",
    category: "academic",
    desc: "A 48-hour challenge to code creative solutions for real-world issues.",
    date: "2025-11-02",
    location: "Wits University",
    img: "../Images/Hackathon.jpg"
  },
  {
    name: "Design & Animation Expo",
    category: "academic",
    desc: "A showcase of student projects in animation, design, and 3D art.",
    date: "2025-10-28",
    location: "University of Cape Town",
    img: "../Images/animation.jpg"
  },

  // Social & Campus Life
  {
    name: "Freshers Bash",
    category: "social",
    desc: "Welcome new students with a night of music, lights, and laughter.",
    date: "2025-02-10",
    location: "Wits University",
    img: "../Images/Wits freshers 2025.jpg"
  },

  {
    name: "Res vs Res Games Night",
    category: "social",
    desc: "Inter-residence games night — Uno, 30 Seconds, Jenga, and more!",
    date: "2025-09-28",
    location: "Rhodes University",
    img: "../Images/Games night.jpg"
  },
  {
    name: "Sunset Picnic on the Lawn",
    category: "social",
    desc: "Bring your blanket, snacks, and besties for a chill evening vibe.",
    date: "2025-09-30",
    location: "University of Pretoria",
    img: "../Images/Picnic.jpg"
  },
  
  {
    name: "Halloween Costume Bash",
    category: "social",
    desc: "Dress to impress or scare — prizes for the best costume!",
    date: "2025-10-31",
    location: "Wits University",
    img: "../Images/Halloween.jpg"
  },


  // 🎨 Creative & Cultural

  {
    name: "Student Art Exhibition",
    category: "creative",
    desc: "A gallery of visual art, photography, and digital design.",
    date: "2025-10-21",
    location: "Wits University",
    img: "../Images/exibition.jpg"
  },
  {
    name: "Film & Chill: African Cinema Night",
    category: "creative",
    desc: "Showcasing African films and student short stories.",
    date: "2025-10-22",
    location: "Wits University",
    img: "../Images/Film and Chill.jpg"
  },

  {
    name: "Drama Society Play: ‘The Roommate’",
    category: "creative",
    desc: "Catch the drama society’s latest performance live at the theatre.",
    date: "2025-09-29",
    location: "University of Zululand",
    img: "../Images/Theater.jpg"
  },

  // 💕 Wellness & Personal Growth
  
  
  {
    name: "Mental Health Awareness Week",
    category: "wellness",
    desc: "Workshops, self-care talks, and free counselling sign-ups.",
    date: "2025-10-02",
    location: "Wits University",
    img: "../Images/MentalHealth.jpg"
  },
  

  // ⚽ Sports & Competition
  {
    name: "5K Fun Run",
    category: "sports",
    desc: "Run, jog, or walk — all proceeds go to student charities.",
    date: "2025-10-09",
    location: "Wits University",
    img: "../Images/Run.jpg"
  },
  {
    name: "Esports Tournament",
    category: "sports",
    desc: "Compete in FIFA, Tekken, and more for cash prizes.",
    date: "2025-10-15",
    location: "Wits University",
    img: "../Images/esports.jpg"
  },

];


// 🎨 Assign each category a fun color
function getCategoryColor(category) {
  switch (category) {
    case "academic":
      return "var(--color-accent)";   // Blue tone
    case "social":
      return "var(--color-primary)";  // Pink tone
    case "sports":
      return "var(--color-secondary)"; // Yellow tone
    case "wellness":
      return "#7dd3a9"; //mint tone
      case "creative":
      return "#b28efc"; //purple tone
    default:
      return "#ccc";
  }
}

// ===== HOMEPAGE FEATURED EVENTS =====
function displayFeaturedEvents() {
  const featuredSection = document.getElementById("featured-events");
  if (!featuredSection) return;

  // create wrapper if not exists
  let wrapper = featuredSection.querySelector(".events-wrapper");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.className = "events-wrapper";
    featuredSection.appendChild(wrapper);
  } else {
    wrapper.innerHTML = ""; // clear previous cards if any
  }

  const today = new Date();
  const featuredEvents = eventsData
    .filter(event => event.featured || new Date(event.date) >= today)
    .slice(0, 6);

  featuredEvents.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <div class="event-image">
        <img src="${event.img}" alt="${event.name}">
      </div>
      <div class="event-info">
        <span class="event-category" style="background:${getCategoryColor(event.category)}">${event.category}</span>
        <h3>${event.name}</h3>
        <p class="event-date">📅 ${new Date(event.date).toDateString()}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      window.location.href = "Events/events.html";
    });

    wrapper.appendChild(card);
  });
}

// ===== EVENTS PAGE FULL LIST + MODAL =====
function displayEvents(events) {
  const eventsList = document.getElementById("events-list");
  if (!eventsList) return;

  const modal = document.getElementById("eventModal");
  const modalBody = document.getElementById("modal-body");
  const closeBtn = document.querySelector(".close");

  eventsList.innerHTML = "";

  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <div class="event-image">
        <img src="${event.img}" alt="${event.name}">
      </div>
      <div class="event-info">
        <span class="event-category" style="background:${getCategoryColor(event.category)}">${event.category}</span>
        <h3>${event.name}</h3>
        <p>${event.desc}</p>
        <p class="event-date">📅 ${new Date(event.date).toDateString()}</p>
        <p class="event-location">📍 ${event.location}</p>
      </div>
    `;
    
    card.addEventListener("click", () => {
      if (!modal || !modalBody) return;
      modalBody.innerHTML = `
        <h1>${event.name}</h1>
        <img src="${event.img}" alt="${event.name}" style="width:100%;border-radius:8px;">
        <span class="event-category" style="background:${getCategoryColor(event.category)};padding:5px 10px;border-radius:5px;margin-top:10px;display:inline-block;">${event.category}</span>
        <p style="margin-top:15px;">${event.desc}</p>
        <p style="font-weight:bold;">📅 ${new Date(event.date).toDateString()}</p>
        <p>📍 ${event.location}</p>
      `;
      modal.style.display = "block";
    });

    eventsList.appendChild(card);
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => (modal.style.display = "none"));
    window.addEventListener("click", e => {
      if (e.target == modal) modal.style.display = "none";
    });
  }
}

// ===== FILTER LOGIC =====
function filterEvents() {
  const searchBar = document.getElementById("searchBar");
  const filterCategory = document.getElementById("filterCategory");
  if (!searchBar || !filterCategory) return;

  const searchText = searchBar.value.toLowerCase();
  const category = filterCategory.value;

  const filtered = eventsData.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchText);
    const matchesCategory = category === "all" || event.category === category;
    return matchesSearch && matchesCategory;
  });

  displayEvents(filtered);
}

// ===== DISCOVER · CONNECT · ATTEND INTERACTIVITY =====
document.querySelectorAll('.motto-word').forEach(word => {
  word.addEventListener('click', () => {
    const target = document.querySelector(word.dataset.target);
    const category = word.dataset.category;

    // Smooth scroll to section
    if (target) target.scrollIntoView({ behavior: 'smooth' });

    // Filter events by category (if available)
    if (typeof displayEvents === "function" && Array.isArray(eventsData)) {
      const filtered = eventsData.filter(event => event.category === category);
      displayEvents(filtered);
    }
  });
});

// ===== EXTERNAL TICKETMASTER EVENTS =====
async function fetchExternalEvents(city = "") {
  const externalDiv = document.getElementById("external-events");
  if (!externalDiv) return;

  externalDiv.innerHTML = "<p>Loading external events...</p>";

  const apiKey = "5ooJdSWCZ0yHV2SFYft8JbQHPwUpeWpn"; // replace with your key
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=ZA&size=10&apikey=${apiKey}${city ? `&city=${city}` : ""}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Check if events exist
    const events = data._embedded?.events || [];
    if (!events.length) {
      externalDiv.innerHTML = "<p>No external events found for this city.</p>";
      return;
    }

    externalDiv.innerHTML = ""; // clear loading message

    events.forEach(event => {
      const card = document.createElement("div");
      card.className = "event-card";
      const img = event.images?.[0]?.url || "https://via.placeholder.com/400x250";

      const startDate = event.dates?.start?.localDate || "Date TBD";
      const venue = event._embedded?.venues?.[0]?.name || "Location TBD";

      card.innerHTML = `
        <div class="event-image">
          <img src="${img}" alt="${event.name}">
        </div>
        <div class="event-info">
          <span class="event-category" style="background:#555">External</span>
          <h3>${event.name}</h3>
          <p class="event-date">📅 ${startDate}</p>
          <p class="event-location">📍 ${venue}</p>
          <a href="${event.url}" target="_blank" class="btn btn-small">View Event</a>
        </div>
      `;

      externalDiv.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    externalDiv.innerHTML = "<p>Failed to load external events.</p>";
  }
}

// Optional: City filter
const citySelect = document.getElementById("externalCityFilter");
if (citySelect) {
  citySelect.addEventListener("change", () => {
    fetchExternalEvents(citySelect.value);
  });
}

// Call initially (all SA events)
fetchExternalEvents();




// ===== CONDITIONAL EXECUTION =====
if (document.getElementById("featured-events")) {
  displayFeaturedEvents();
}

if (document.getElementById("events-list")) {
  displayEvents(eventsData);

  const searchBar = document.getElementById("searchBar");
  const filterCategory = document.getElementById("filterCategory");
  if (searchBar && filterCategory) {
    searchBar.addEventListener("input", filterEvents);
    filterCategory.addEventListener("change", filterEvents);
  }
}

