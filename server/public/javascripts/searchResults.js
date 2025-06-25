
// Ensure locomotive is initialized
const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
});

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Show/hide button based on scroll position
scroll.on("scroll", (obj) => {
  if (obj.scroll.y > 300) {
    scrollToTopBtn.classList.remove("opacity-0");
  } else {
    scrollToTopBtn.classList.add("opacity-0");
  }
});

// Scroll to top smoothly using Locomotive
scrollToTopBtn.addEventListener("click", () => {
  scroll.scrollTo(0, {
    duration: 1000,
    easing: [0.25, 0.0, 0.35, 1.0] // easeInOutCubic
  });
});
