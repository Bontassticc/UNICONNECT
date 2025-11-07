// ===== GET FORM ELEMENTS ===== 
const addEventForm = document.getElementById("addEventForm");
const formSuccess = document.getElementById("formSuccess");

// Only run if the form exists
if (addEventForm) {

  const inputs = addEventForm.querySelectorAll("input, textarea, select");

  // ===== REAL-TIME VALIDATION =====
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      const error = input.nextElementSibling;

      // Required field check
      if (!input.value && input.hasAttribute("required")) {
        if (error) error.textContent = "This field is required";
        input.style.borderColor = "red";
      } else {
        if (error) error.textContent = "";
        input.style.borderColor = "green";
      }

      // URL validation for event image
      if (input.id === "eventImg" && input.value) {
        try {
          new URL(input.value);
          if (error) error.textContent = "";
          input.style.borderColor = "green";
        } catch {
          if (error) error.textContent = "Please enter a valid URL";
          input.style.borderColor = "red";
        }
      }

      // Date cannot be in the past
      if (input.id === "eventDate" && input.value) {
        const selectedDate = new Date(input.value);
        const today = new Date();
        today.setHours(0,0,0,0);
        if (selectedDate < today) {
          if (error) error.textContent = "Date cannot be in the past";
          input.style.borderColor = "red";
        } else {
          if (error) error.textContent = "";
          input.style.borderColor = "green";
        }
      }
    });
  });

  // ===== SUBMIT FORM =====
  addEventForm.addEventListener("submit", function(e) {
    e.preventDefault(); // prevent reload

    let isValid = true;

    // Final validation before submitting
    inputs.forEach(input => {
      const error = input.nextElementSibling;
      if (!input.value && input.hasAttribute("required")) {
        if (error) error.textContent = "This field is required";
        input.style.borderColor = "red";
        isValid = false;
      }
    });

    if (!isValid) return;

    // ===== COLLECT DATA =====
    const newEvent = {
      name: document.getElementById("eventName").value,
      date: document.getElementById("eventDate").value,
      location: document.getElementById("eventLocation").value,
      category: document.getElementById("eventCategory").value,
      desc: document.getElementById("eventDesc").value,
      img: document.getElementById("eventImg").value || "https://via.placeholder.com/400x250",
      featured: false
    };

    // ===== ADD TO EVENTS DATA =====
    eventsData.push(newEvent);

    // ===== REFRESH EVENTS =====
    if (document.getElementById("events-list")) displayEvents(eventsData);
    if (document.getElementById("featured-events")) displayFeaturedEvents();

    // ===== RESET FORM & SUCCESS MESSAGE =====
    addEventForm.reset();
    inputs.forEach(input => input.style.borderColor = ""); // reset borders
    formSuccess.style.display = "block";

    setTimeout(() => {
      formSuccess.style.display = "none";
    }, 4000);
  });
}
