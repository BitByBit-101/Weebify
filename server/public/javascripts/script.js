document.addEventListener("DOMContentLoaded", () => {
    const animeList = document.getElementById("animeList");

    fetch("/api/trending")
        .then((res) => res.json())
        .then((animes) => {
            animes.forEach((anime) => {
                const div = document.createElement("div");
                div.className = "inline-block w-40 flex-shrink-0 cursor-pointer rounded-lg overflow-hidden shadow-lg bg-black hover:scale-105 transform transition duration-300";
                div.title = anime.title;

                div.innerHTML = `
          <img data-scroll data-scroll-direction="2" data-scroll-speed="2" src="${anime.images.jpg.image_url}" alt="${anime.title}" class="w-full h-48 object-cover" />
          <h3 class="text-red-600 text-sm text-center p-1 font-semibold">${anime.title}</h3>
        `;

                animeList.appendChild(div);
            });

            // Animate horizontal infinite scroll with GSAP
            const scrollWidth = animeList.scrollWidth;
            const clone = animeList.cloneNode(true);
            clone.id = "animeListClone";
            clone.style.position = "absolute";
            clone.style.top = "0";
            clone.style.left = `${scrollWidth}px`;
            animeList.parentNode.appendChild(clone);

            gsap.to([animeList, clone], {
                x: `-=${scrollWidth}`,
                duration: 10,
                ease: "linear",
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize((x) => parseFloat(x) % scrollWidth),
                },
            });
        })
        .catch((error) => {
            console.error("Failed to fetch or animate anime list:", error);
        });
});

const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    lerp:0.07
});
//fade in text
 scroll.on("scroll", () => {
    document.querySelectorAll(".autoshow").forEach((el) => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
      
      if (inView) {
        el.classList.add("in-view");
      } else {
        el.classList.remove("in-view"); // Remove when out of view
      }
    });
  });

 //blur effect
  scroll.on("scroll", () => {
    document.querySelectorAll(".autoBlur").forEach((el) => {
      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      const vh = window.innerHeight;

      const lowerBound = vh * 0.45;
      const upperBound = vh * 0.60;

      if (elCenter >= lowerBound && elCenter <= upperBound) {
        el.classList.add("in-focus");
      } else {
        el.classList.remove("in-focus");
      }
    });
  });

