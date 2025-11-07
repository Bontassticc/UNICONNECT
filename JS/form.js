// ===== GET FORM ELEMENTS =====
const addEventForm = document.getElementById("addEventForm");
const formSuccess = document.getElementById("formSuccess");

// Make sure form exists on this page
if (addEventForm) {

  addEventForm.addEventListener("submit", function(e) {
    e.preventDefault(); // prevent page reload

    let isValid = true;

    // Grab all input/select/textarea elements
    const inputs = addEventForm.querySelectorAll("input, textarea, select");

    // Clear previous errors
    inputs.forEach(input => {
      const error = input.nextElementSibling;
      if (error) error.textContent = "";
    });

    // Simple required field validation
    inputs.forEach(input => {
      if (!input.value && input.hasAttribute("required")) {
        const error = input.nextElementSibling;
        if (error) error.textContent = "This field is required";
        isValid = false;
      }
    });

    if (!isValid) return;

    // ===== COLLECT FORM DATA =====
    const newEvent = {
      name: document.getElementById("eventName").value,
      date: document.getElementById("eventDate").value,
      location: document.getElementById("eventLocation").value,
      category: document.getElementById("eventCategory").value,
      desc: document.getElementById("eventDesc").value,
      img: document.getElementById("eventImg").value || "https://via.placeholder.com/400x250",
      featured: false // optional: you can make a checkbox for featured events
    };

    // ===== ADD NEW EVENT TO GLOBAL EVENTS DATA =====
    eventsData.push(newEvent);

    // ===== REFRESH EVENTS DISPLAY =====
    const eventsListDiv = document.getElementById("events-list");
    if (eventsListDiv) {
      displayEvents(eventsData);
    }

    // ===== REFRESH HOMEPAGE FEATURED EVENTS =====
    const featuredDiv = document.getElementById("featured-events");
    if (featuredDiv) {
      displayFeaturedEvents();
    }

    // ===== RESET FORM & SHOW SUCCESS MESSAGE =====
    addEventForm.reset();
    formSuccess.style.display = "block";

    setTimeout(() => {
      formSuccess.style.display = "none";
    }, 4000);
  });
}
