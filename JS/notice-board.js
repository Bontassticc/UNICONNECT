// ===== GLOBAL EVENTS DATA =====
const eventsData = [
  { date: "2025-11-10", title: "Study Night", location: "Wits University" },
  { date: "2025-11-15", title: "Campus Festival", location: "UCT" },
  { date: "2025-11-25", title: "Midterm Break Starts", location: "UP" },
];

// ===== CALENDAR LOGIC =====
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

// ===== WEATHER LOGIC =====
const weatherDiv = document.getElementById("weather");
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("weatherSearchBtn");
const apiKey = "YOUR_API_KEY_HERE"; // <-- replace with your key

async function fetchWeather(city){
  weatherDiv.innerHTML = "<p>Loading weather...</p>";
  try{
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await res.json();
    if(data.cod!==200) { weatherDiv.innerHTML="<p>City not found</p>"; return;}
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weatherDiv.innerHTML = `
      <img src="${icon}" alt="${desc}">
      <p>${city}</p>
      <p>${temp}°C | ${desc}</p>
    `;
  }catch(err){ weatherDiv.innerHTML="<p>Unable to load weather</p>"; }
}

// Default city
fetchWeather("Johannesburg");
searchBtn.addEventListener("click",()=>{ const city = cityInput.value.trim(); if(city) fetchWeather(city); });
cityInput.addEventListener("keypress",(e)=>{ if(e.key==="Enter"){ const city = cityInput.value.trim(); if(city) fetchWeather(city); }});

// ===== MAP LOGIC (Leaflet.js) =====
const map = L.map('map').setView([-26.2041,28.0473], 6); // Default: South Africa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  maxZoom:19,
}).addTo(map);

// Map markers from eventsData
const campusCoords = { "Wits University":[-26.1882,28.0300], "UCT":[-33.9570,18.4609], "UP":[-25.7540,28.2314] };
eventsData.forEach(event=>{
  const coords = campusCoords[event.location];
  if(coords) L.marker(coords).addTo(map).bindPopup(`<b>${event.title}</b><br>${event.date}`);
});

eventsData.forEach(event => {
  const coords = getCoords(event.location); // a function mapping campus names to lat/lng
  if (coords) {
    L.marker(coords).addTo(map)
      .bindPopup(`<b>${event.title}</b><br>${event.date}`);
  }
});


// ===== GSAP Fade-in for Cohesion =====
gsap.from(".glass-card", {opacity:0, y:30, duration:0.8, stagger:0.2, ease:"power2.out"});
