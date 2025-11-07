// Get DOM elements
const searchBar = document.getElementById("searchBar");
const filterCategory = document.getElementById("filterCategory");
const eventsList = document.getElementById("events-list");

// 🎉 Demo Event Data
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
    name: "Sports Festival",
    category: "sports",
    desc: "Cheer for your teams at the annual interfaculty sports day!",
    date: "2025-11-18",
    location: "Wits University",
    img: "assets/images/sports-fest.jpg"
  },
  
  {
    name: "Movie Under the Stars",
    category: "social",
    desc: "Outdoor cinema night with popcorn, beanbags, and fairy lights!",
    date: "2025-11-20",
    location: "Wits University",
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
    location: "Wits University",
    img: "https://via.placeholder.com/400x250?text=Design+Expo"
  },
  {
    name: "Women in Tech Conference",
    category: "academic",
    desc: "Empowering women innovators and leaders in the tech space.",
    date: "2025-10-18",
    location: "Wits University",
    img: "https://via.placeholder.com/400x250?text=Women+in+Tech"
  },

  {
    name: "Exam Survival Bootcamp",
    category: "academic",
    desc: "Stress management, study tips, and free snacks for students!",
    date: "2025-10-25",
    location: "Wits University",
    img: "https://via.placeholder.com/400x250?text=Exam+Bootcamp"
  },
  {
    name: "Public Speaking 101",
    category: "academic",
    desc: "Overcome stage fright and speak confidently at any event.",
    date: "2025-10-14",
    location: "Wits University",
    img: "https://via.placeholder.com/400x250?text=Public+Speaking"
  },
  {
    name: "Research Poster Showcase",
    category: "academic",
    desc: "Discover groundbreaking student research across faculties.",
    date: "2025-09-27",
    location: "Wits University",
    img: "https://via.placeholder.com/400x250?text=Research+Showcase"
  },

  // 🎶 Social & Campus Life

  {
    name: "Heritage Day Braai",
    category: "social",
    desc: "Celebrate SA’s diversity with food, games, and live performances!",
    date: "2025-09-24",
    location: "Wits University",
    img: "../Images/Heritage Day.jpg"
  },
  {
    name: "Freshers Bash",
    category: "social",
    desc: "Welcome new students with a night of music, lights, and laughter.",
    date: "2025-02-10",
    location: "Wits University",
    img: "https://via.placeholder.com/400x250?text=Freshers+Bash"
  },

  {
    name: "Cultural Day Food Fair",
    category: "social",
    desc: "Taste, dance, and explore the cultures that make up our campus!",
    date: "2025-09-16",
    location: "Wits University",
    img: "https://via.placeholder.com/400x250?text=Cultural+Fair"
  },
  {
    name: "Res vs Res Games Night",
    category: "social",
    desc: "Inter-residence games night — Uno, 30 Seconds, Jenga, and more!",
    date: "2025-09-28",
    location: "Wits University",
    img: "https://via.placeholder.com/400x250?text=Games+Night"
  },
  {
    name: "Sunset Picnic on the Lawn",
    category: "social",
    desc: "Bring your blanket, snacks, and besties for a chill evening vibe.",
    date: "2025-09-30",
    location: "Wits University",
    img: "https://via.placeholder.com/400x250?text=Picnic+Evening"
  },
  {
    name: "Silent Disco",
    category: "social",
    desc: "Grab a headset and dance to your own rhythm under neon lights!",
    date: "2025-10-03",
    location: "Wits University",
    img: "https://via.placeholder.com/400x250?text=Silent+Disco"
  },
  {
    name: "Halloween Costume Bash",
    category: "social",
    desc: "Dress to impress or scare — prizes for the best costume!",
    date: "2025-10-31",
    location: "Wits University",
    img: "https://via.placeholder.com/400x250?text=Halloween+Bash"
  },

  {
    name: "Pride Celebration & Queer Film Night",
    category: "social",
    desc: "Celebrate love, diversity, and authenticity with us 🌈",
    date: "2025-10-26",
    location: "Wits University",
    img: "https://via.placeholder.com/400x250?text=Pride+Night"
  },

  // 🎨 Creative & Cultural
  {
    name: "Poetry & Open Mic Night",
    category: "creative",
    desc: "Step up and share your voice — spoken word, music, and vibes.",
    date: "2025-10-05",
    img: "https://via.placeholder.com/400x250?text=Poetry+Night"
  },
  {
    name: "Student Art Exhibition",
    category: "creative",
    desc: "A gallery of visual art, photography, and digital design.",
    date: "2025-10-21",
    img: "https://via.placeholder.com/400x250?text=Art+Exhibition"
  },
  {
    name: "Fashion Show: Sustainable Style",
    category: "creative",
    desc: "Showcasing eco-friendly designs by student creators.",
    date: "2025-10-19",
    img: "https://via.placeholder.com/400x250?text=Fashion+Show"
  },
  
  {
    name: "Film & Chill: African Cinema Night",
    category: "creative",
    desc: "Showcasing African films and student short stories.",
    date: "2025-10-22",
    img: "https://via.placeholder.com/400x250?text=African+Cinema"
  },

  {
    name: "Drama Society Play: ‘The Roommate’",
    category: "creative",
    desc: "Catch the drama society’s latest performance live at the theatre.",
    date: "2025-09-29",
    img: "https://via.placeholder.com/400x250?text=Drama+Night"
  },

  // 💕 Wellness & Personal Growth
  
  
  {
    name: "Mental Health Awareness Week",
    category: "wellness",
    desc: "Workshops, self-care talks, and free counselling sign-ups.",
    date: "2025-10-02",
    location: "Wits University",
    img: "https://via.placeholder.com/400x250?text=Mental+Health+Week"
  },
  
  {
    name: "Self-Care Sunday",
    category: "wellness",
    desc: "Guided journaling, skincare tips, and soft music — all welcome.",
    date: "2025-10-13",
    location: "Wits University",
    img: "https://via.placeholder.com/400x250?text=Self+Care"
  },
  {
    name: "Campus Clean-Up Challenge",
    category: "wellness",
    desc: "Join us to keep our campus clean and green. Free T-shirts!",
    date: "2025-09-22",
    location: "Wits University",
    img: "https://via.placeholder.com/400x250?text=Clean+Up"
  },

  // ⚽ Sports & Competition
  {
    name: "Interfaculty Sports Day",
    category: "sports",
    desc: "Soccer, netball, rugby, and volleyball battles between faculties!",
    date: "2025-09-26",
    location: "Wits University",
    img: "https://via.placeholder.com/400x250?text=Sports+Day"
  },
  {
    name: "Fitness Bootcamp Challenge",
    category: "sports",
    desc: "A full-body HIIT session open to all students. No excuses!",
    date: "2025-10-08",
    location: "Wits University",
    img: "https://via.placeholder.com/400x250?text=Bootcamp"
  },
  {
    name: "5K Fun Run",
    category: "sports",
    desc: "Run, jog, or walk — all proceeds go to student charities.",
    date: "2025-10-09",
    location: "Wits University",
    img: "https://via.placeholder.com/400x250?text=Fun+Run"
  },
  {
    name: "Esports Tournament",
    category: "sports",
    desc: "Compete in FIFA, Tekken, and more for cash prizes.",
    date: "2025-10-15",
    location: "Wits University",
    img: "https://via.placeholder.com/400x250?text=Esports"
  },
  {
    name: "Dodgeball Night",
    category: "sports",
    desc: "Grab your team and duck, dive, and dodge your way to victory!",
    date: "2025-10-24",
    location: "Wits University",
    img: "https://via.placeholder.com/400x250?text=Dodgeball"
  }
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

