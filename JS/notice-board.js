// ===== NOTICE BOARD PAGE JS =====

// --- 1. Dynamic Calendar Setup ---
const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

let currentDate = new Date();

const eventsData = [
  { date: "2025-11-10", title: "Study Night" },
  { date: "2025-11-15", title: "Campus Festival" },
  { date: "2025-11-25", title: "Midterm Break Starts" },
];

function renderCalendar(date) {
  calendar.innerHTML = "";

  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  monthYear.textContent = `${monthNames[month]} ${year}`;

  // Fill empty spaces before the first day
  for (let i = 0; i < startDay; i++) {
    const empty = document.createElement("div");
    calendar.appendChild(empty);
  }

  // Fill days
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const day = document.createElement("div");
    day.textContent = i;

    const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
    const event = eventsData.find(e => e.date === fullDate);

    if (event) {
      day.classList.add("has-event");
      day.title = event.title;
      day.innerHTML = `<strong>${i}</strong><br><small>${event.title}</small>`;
    }

    calendar.appendChild(day);
  }
}

prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

renderCalendar(currentDate);

// --- 2. Weather Widget Setup ---
const weatherInfo = document.getElementById("weather-info");
const city = "Johannesburg"; // change to your campus city
const apiKey = "7a0e96b40e23a80fd80c22b124e285f1"; // <-- add your API key here

async function loadWeather() {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();

    if (data.cod === 200) {
      weatherInfo.innerHTML = `
        <div class="weather-details">
          <h3>${data.name}</h3>
          <p>${data.weather[0].description}</p>
          <p>🌡 ${Math.round(data.main.temp)}°C</p>
          <p>💨 ${data.wind.speed} m/s wind</p>
        </div>
      `;
    } else {
      weatherInfo.innerHTML = `<p>City not found.</p>`;
    }
  } catch (err) {
    weatherInfo.innerHTML = `<p>Weather data unavailable.</p>`;
  }
}

loadWeather();

// --- 3. Add GSAP Fade-in Animation (optional, for cohesion) ---
gsap.from(".glass-card", {
  opacity: 0,
  y: 30,
  duration: 0.8,
  stagger: 0.2,
  ease: "power2.out"
});
