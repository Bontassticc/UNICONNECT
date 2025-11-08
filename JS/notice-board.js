

const eventsData = [
  { date: "2025-11-10", title: "Study Night", location: "Wits University" },
  { date: "2025-11-15", title: "Campus Festival", location: "UCT" },
  { date: "2025-11-28", title: "Holiday Break Starts", location: "UP" },
  { date: "2025-12-2",  title: "End Year Bash", location: "DUT" },

];

// CALENDAR LOGIC //
const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
let currentDate = new Date();

function renderCalendar(date) {
  calendar.innerHTML = "";
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  monthYear.textContent = `${monthNames[month]} ${year}`;

  for(let i = 0; i < startDay; i++) calendar.appendChild(document.createElement("div"));

  for(let i = 1; i <= lastDay.getDate(); i++){
    const day = document.createElement("div");
    day.textContent = i;
    const fullDate = `${year}-${String(month+1).padStart(2,"0")}-${String(i).padStart(2,"0")}`;
    const event = eventsData.find(e=>e.date===fullDate);
    if(event){
      day.classList.add("has-event");
      day.title = event.title;
      day.innerHTML = `<strong>${i}</strong><br><small>${event.title}</small>`;
    }
    calendar.appendChild(day);
  }
}

prevMonthBtn.addEventListener("click",()=>{currentDate.setMonth(currentDate.getMonth()-1); renderCalendar(currentDate);});
nextMonthBtn.addEventListener("click",()=>{currentDate.setMonth(currentDate.getMonth()+1); renderCalendar(currentDate);});
renderCalendar(currentDate);

//weather//
const weatherDiv = document.getElementById("weather");
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("weatherSearchBtn");
const apiKey = "7c29c5fa84eea9dfff6b081d13cbf057";

// Function to fetch and display weather//
async function fetchWeather(city) {
  weatherDiv.innerHTML = "<p>Loading weather...</p>";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();

    // Handle errors//
    if (data.cod !== 200) {
      weatherDiv.innerHTML = `<p>City not found: ${city}</p>`;
      return;
    }

    // Extract weather info//
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // Display results//
    weatherDiv.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;">
        <img src="${icon}" alt="${desc}" width="50">
        <div>
          <p style="margin:0;font-weight:bold;">${data.name}</p>
          <p style="margin:0;">${temp}°C | ${desc}</p>
        </div>
      </div>
    `;
  } catch (err) {
    console.error("Weather fetch error:", err);
    weatherDiv.innerHTML = "<p>Error loading weather data.</p>";
  }
}

// Default city on load//
fetchWeather("Johannesburg");

// Search button click//
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

// Allow pressing Enter to search//
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
  }
});

// MAP LOGIC (Using Leaflet.js for my map hehe) //
const map = L.map('map').setView([-26.2041,28.0473], 6); // Default: South Africa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  maxZoom:19,
}).addTo(map);

// Map markers from eventsData//
const campusCoords = { "Wits University":[-26.1882,28.0300], "UCT":[-33.9570,18.4609], "UP":[-25.7540,28.2314], "DUT":[-29.8496,31.0103] };
eventsData.forEach(event=>{
  const coords = campusCoords[event.location];
  if(coords) L.marker(coords).addTo(map).bindPopup(`<b>${event.title}</b><br>${event.date}`);
});

eventsData.forEach(event => {
  const coords = getCoords(event.location); 
  if (coords) {
    L.marker(coords).addTo(map)
      .bindPopup(`<b>${event.title}</b><br>${event.date}`);
  }
});




// GSAP Fade-in for Cohesion //
gsap.from(".glass-card", {opacity:0, y:30, duration:0.8, stagger:0.2, ease:"power2.out"});
