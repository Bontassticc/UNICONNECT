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

// ===== HOMEPAGE GSAP ANIMATIONS =====
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// --- 1. Timeline Animation: Hero intro ---
const heroTl = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });

heroTl
  .from(".hero h1", { y: -50, opacity: 0 })
  .from(".hero p", { y: 30, opacity: 0 }, "-=0.5")
  .from(".hero .btn", { scale: 0.8, opacity: 0 }, "-=0.3");

// --- 2. ScrollTrigger Animations ---
gsap.from(".spotlight-event", {
  scrollTrigger: {
    trigger: ".spotlight-event",
    start: "top 80%",
  },
  y: 50,
  opacity: 0,
  duration: 1,
});

gsap.from(".testimonials", {
  scrollTrigger: {
    trigger: ".testimonials",
    start: "top 85%",
  },
  y: 50,
  opacity: 0,
  duration: 1,
});

// --- 3. MotionPath Animation (small floating icon) ---
const floatingIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
floatingIcon.setAttribute("class", "motion-icon");
floatingIcon.setAttribute("width", "60");
floatingIcon.setAttribute("height", "60");
floatingIcon.innerHTML = `<circle cx="10" cy="10" r="8" fill="#f2a65a"/>`;
document.body.appendChild(floatingIcon);

gsap.to(".motion-icon", {
  duration: 8,
  repeat: -1,
  ease: "none",
  motionPath: {
    path: [
      { x: 0, y: 0 },
      { x: 150, y: 30 },
      { x: 300, y: -20 },
      { x: 450, y: 40 },
      { x: 600, y: 0 },
    ],
    curviness: 1.25,
  },
});

// --- 4. Hover Animation on Buttons ---
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    gsap.to(btn, { scale: 1.05, duration: 0.3, ease: "power1.out" });
  });
  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, { scale: 1, duration: 0.3, ease: "power1.in" });
  });
});

// ===== HERO LINE MOTIONPATH ANIMATION =====
gsap.from("#connectPath", {
  duration: 5,
  drawSVG: "0%",
  ease: "power2.inOut"
});

gsap.to("#connectPath", {
  scrollTrigger: {
    trigger: ".hero",
    start: "top center",
    toggleActions: "play none none reverse"
  },
  duration: 3,
  strokeDasharray: 500,
  strokeDashoffset: 500,
  ease: "power2.inOut",
  onStart: () => {
    gsap.fromTo(
      "#connectPath",
      { strokeDashoffset: 500 },
      { strokeDashoffset: 0, duration: 3, ease: "power2.inOut" }
    );
  }
});
