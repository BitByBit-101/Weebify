document.querySelectorAll(".rating-form").forEach((form) => {
  const rating = form.querySelector(".rating");
  const ul = rating.querySelector("ul");
  const stars = ul.querySelectorAll("li");
  const input = form.querySelector(".rating-value");
  const submit = form.querySelector("button[type='submit']");

  let current = ul.querySelector(".current");

  stars.forEach((li) => {
    li.addEventListener("click", () => {
      if (rating.classList.contains("animate-left") || rating.classList.contains("animate-right")) return;

      if (current) current.classList.remove("current");

      stars.forEach((star) => {
        star.classList.toggle("active", li.dataset.value > star.dataset.value);
      });

      const direction = (!current || li.dataset.value > current.dataset.value)
        ? "animate-right"
        : "animate-left";

      rating.classList.add(direction);
      rating.style.setProperty("--x", li.offsetLeft + "px");

      li.classList.add("move-to");
      if (current) current.classList.add("move-from");

      setTimeout(() => {
        li.classList.add("current");
        li.classList.remove("move-to");
        if (current) current.classList.remove("move-from");
        rating.classList.remove("animate-left", "animate-right");
        input.value = li.dataset.value;
        current = li;

        // Enable submit
        submit.disabled = false;
        submit.classList.remove("opacity-50", "cursor-not-allowed");
      }, 800);
    });
  });
});

