(() => {
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector("[data-nav-toggle]");
  const drawer = document.querySelector("[data-nav-drawer]");
  const hero = document.querySelector(".hero");

  const setDrawer = (open) => {
    if (!toggle || !drawer) return;
    toggle.setAttribute("aria-expanded", String(open));
    drawer.classList.toggle("is-open", open);
    if (open) {
      drawer.removeAttribute("hidden");
    } else {
      drawer.setAttribute("hidden", "");
    }
  };

  if (toggle && drawer) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      setDrawer(open);
    });

    drawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setDrawer(false));
    });
  }

  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  requestAnimationFrame(() => {
    if (hero) hero.classList.add("is-in");
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    document.querySelectorAll(".scroll-in").forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll(".scroll-in").forEach((el) => el.classList.add("is-visible"));
    if (hero) hero.classList.add("is-in");
  }
})();
