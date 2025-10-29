const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");

let currentDate = new Date();

// Sample events data
const eventsData = [
  {name:"Campus Music Night", category:"social", date:"2025-11-05"},
  {name:"Career Fair", category:"academic", date:"2025-11-12"},
  {name:"Sports Fest", category:"sports", date:"2025-11-20"},
  {name:"Art Workshop", category:"social", date:"2025-11-25"}
];

// Helper: get color by category
function getCategoryColor(category){
  switch(category){
    case "social": return "#f2a65a";
    case "academic": return "#c1785c";
    case "sports": return "#557c55";
    default: return "#ccc";
  }
}

// Render calendar
function renderCalendar(date){
  calendar.innerHTML = "";
  const year = date.getFullYear();
  const month = date.getMonth();

  monthYear.textContent = date.toLocaleString('default', {month:'long', year:'numeric'});

  // First day of month
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();

  // Fill empty days
  for(let i=0;i<firstDay;i++){
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("calendar-day");
    calendar.appendChild(emptyCell);
  }

  // Fill days
  for(let day=1; day<=daysInMonth; day++){
    const dayCell = document.createElement("div");
    dayCell.classList.add("calendar-day");

    const dayNumber = document.createElement("div");
    dayNumber.classList.add("day-number");
    dayNumber.textContent = day;
    dayCell.appendChild(dayNumber);

    // Check events for this day
    const dayStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const dayEvents = eventsData.filter(e => e.date === dayStr);

    dayEvents.forEach(e=>{
      const badge = document.createElement("span");
      badge.classList.add("event-badge");
      badge.style.backgroundColor = getCategoryColor(e.category);
      badge.textContent = e.name;
      badge.title = e.name; // tooltip
      dayCell.appendChild(badge);
    });

    calendar.appendChild(dayCell);
  }
}

// Initial render
renderCalendar(currentDate);

// Navigation
prevMonth.addEventListener("click", ()=>{
  currentDate.setMonth(currentDate.getMonth()-1);
  renderCalendar(currentDate);
});

nextMonth.addEventListener("click", ()=>{
  currentDate.setMonth(currentDate.getMonth()+1);
  renderCalendar(currentDate);
});

