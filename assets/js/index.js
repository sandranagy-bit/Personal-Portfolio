// CHANGE ACTIVE LINK OF THE NAVBAR WITH SCROLLING
const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", function () {
  let currentSection = "";

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove("active", "text-primary", "font-bold");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active", "text-primary", "font-bold");
    }
  });
});

//DARK OR LIGHT MODE
const themeBtn = document.querySelector("#theme-toggle-button");

themeBtn.addEventListener("click", function () {
  document.documentElement.classList.toggle("dark");
});

//FILTER PORTFILIO PROJECTS
const filterBtns = document.querySelectorAll(".portfolio-filter");
const portfolioItems = document.querySelectorAll(".portfolio-item");

const inactiveClasses = [
  "bg-white",
  "dark:bg-slate-800",
  "text-slate-600",
  "dark:text-slate-300",
  "border",
  "border-slate-300",
  "dark:border-slate-700",
];

const activeClasses = [
  "active",
  "bg-linear-to-r",
  "from-primary",
  "to-secondary",
  "text-white",
  "shadow-lg",
  "shadow-primary/50",
];

filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const filter = btn.getAttribute("data-filter");

    //change all labels to default
    filterBtns.forEach(function (b) {
      b.classList.remove.apply(b.classList, activeClasses);
      b.classList.add.apply(b.classList, inactiveClasses);
      b.setAttribute("aria-pressed", "false"); //[cite: 1]
      b.style.removeProperty("background-image");
      b.style.removeProperty("background");
      b.style.removeProperty("color");
      b.style.removeProperty("box-shadow");
    });

    //change pressed button only
    btn.classList.remove.apply(btn.classList, inactiveClasses);
    btn.classList.add.apply(btn.classList, activeClasses);
    btn.setAttribute("aria-pressed", "true"); //[cite: 1]

    if (typeof currentTheme !== "undefined" && currentTheme) {
      btn.style.backgroundImage =
        "linear-gradient(135deg, " +
        currentTheme.dark +
        ", " +
        currentTheme.light +
        ")";
    }

    //filter cards
    portfolioItems.forEach(function (item) {
      const category = item.getAttribute("data-category"); //[cite: 1]
      if (filter === "all" || filter === category) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  });
});

//CAROUSEL
const carousel = document.querySelector("#testimonials-carousel");
const cards = document.querySelectorAll(".testimonial-card");
const nextBtn = document.querySelector("#next-testimonial");
const prevBtn = document.querySelector("#prev-testimonial");
const dots = document.querySelectorAll(".carousel-indicator");

let currentIndex = 0;

if (carousel) {
  carousel.style.transition = "transform 0.4s ease";
}

function updateDots() {
  dots.forEach(function (dot, i) {
    if (i === currentIndex) {
      dot.classList.remove("bg-slate-400", "dark:bg-slate-600");
      dot.classList.add("bg-accent", "scale-125");
    } else {
      dot.classList.remove("bg-accent", "scale-125");
      dot.classList.add("bg-slate-400", "dark:bg-slate-600");
    }
  });
}

function goToSlide(index) {
  if (!carousel || !cards.length) return;

  const totalDots = dots.length || 4;

  if (index >= totalDots) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = totalDots - 1;
  } else {
    currentIndex = index;
  }
  const visibleCards = Math.max(
    1,
    Math.round(
      carousel.parentElement.clientWidth /
        cards[0].getBoundingClientRect().width,
    ),
  );
  const maxIndex = Math.max(1, cards.length - visibleCards);
  const stepIndex = Math.min(currentIndex, maxIndex);
  const cardWidth = cards[0].getBoundingClientRect().width;
  carousel.style.transform = "translateX(" + stepIndex * cardWidth + "px)";
  updateDots();
}

if (nextBtn) {
  nextBtn.addEventListener("click", function () {
    goToSlide(currentIndex + 1);
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", function () {
    goToSlide(currentIndex - 1);
  });
}

dots.forEach(function (dot, i) {
  dot.addEventListener("click", function () {
    goToSlide(i);
  });
});

window.addEventListener("resize", function () {
  goToSlide(currentIndex);
});

goToSlide(0);

//OPENENING AND CLOSING OF SIDEBAR WITH CHANGE OF FONT AND THEMES
const settingsToggle = document.querySelector("#settings-toggle");
const settingsSidebar = document.querySelector("#settings-sidebar");
const closeSettings = document.querySelector("#close-settings");
const resetSettings = document.querySelector("#reset-settings");
const fontBtns = document.querySelectorAll(".font-option");
const colorsGrid = document.querySelector("#theme-colors-grid");

let currentTheme = null;

const navUnderlineStyle = document.createElement("style");
navUnderlineStyle.id = "navbar-active-underline";
document.head.appendChild(navUnderlineStyle);

function updateNavbarUnderline(color) {
  const lineColor = color || "#818cf8";
  navUnderlineStyle.textContent =
    ".nav-links a.active { position: relative; }" +
    ".nav-links a.active::after { content: ''; position: absolute; left: 0; right: 0; bottom: -6px; height: 2.5px; border-radius: 9999px; background: " +
    lineColor +
    "; }";
}

updateNavbarUnderline(null);

const themes = [
  { dark: "#6B64F2", light: "#815FF5" },
  { dark: "#EE5081", light: "#F76B30" },
  { dark: "#0EB27C", light: "#079C6D" },
  { dark: "#318CEF", light: "#10ADDA" },
  { dark: "#F0434A", light: "#F34059" },
  { dark: "#F38F0B", light: "#ED670C" },
];

function applyTheme(theme) {
  currentTheme = theme;
  const root = document.documentElement;
  updateNavbarUnderline(theme ? theme.light : null);

  if (!theme) {
    [
      "--primary",
      "--secondary",
      "--accent",
      "--color-primary",
      "--color-secondary",
      "--color-accent",
    ].forEach(function (v) {
      root.style.removeProperty(v);
    });
  } else {
    root.style.setProperty("--primary", theme.light);
    root.style.setProperty("--secondary", theme.dark);
    root.style.setProperty("--accent", theme.light);
    root.style.setProperty("--color-primary", theme.light);
    root.style.setProperty("--color-secondary", theme.dark);
    root.style.setProperty("--color-accent", theme.light);
  }

  //apply theme to subtitles and extras
  const subtitles = document.querySelectorAll(
    "#about span.text-primary, #skills-section span.text-secondary, #portfolio span.text-primary, #experience span.text-secondary, #testimonials span.text-accent, #contact span.text-primary",
  );
  subtitles.forEach(function (sub) {
    if (theme) {
      sub.style.color = theme.light;
    } else {
      sub.style.removeProperty("color");
    }
  });

  //apply theme for active elements
  document
    .querySelectorAll(".nav-links a, .portfolio-filter, .font-option")
    .forEach(function (el) {
      if (!el.classList.contains("active")) {
        el.style.removeProperty("color");
        el.style.removeProperty("background-image");
        return;
      }

      if (el.classList.contains("portfolio-filter")) {
        el.style.removeProperty("color");
        if (theme) {
          el.style.backgroundImage =
            "linear-gradient(135deg, " + theme.dark + ", " + theme.light + ")";
        } else {
          el.style.removeProperty("background-image");
        }
      } else if (theme) {
        el.style.color = theme.light;
      } else {
        el.style.removeProperty("color");
      }
    });

  document
    .querySelectorAll(
      "[class*='from-primary'], [class*='to-secondary'], [class*='from-secondary'], [class*='to-accent'], #scroll-to-top",
    )
    .forEach(function (el) {
      if (el.classList.contains("portfolio-filter")) return;
      if (!theme) {
        el.style.removeProperty("background-image");
        return;
      }
      if (
        el.id === "scroll-to-top" ||
        el.classList.contains("bg-linear-to-r") ||
        el.classList.contains("bg-gradient-to-r") ||
        el.classList.contains("bg-gradient-to-l") ||
        el.classList.contains("bg-linear-to-br") ||
        el.classList.contains("bg-gradient-to-br") ||
        el.classList.contains("bg-gradient-to-tr")
      ) {
        el.style.backgroundImage =
          "linear-gradient(135deg, " + theme.dark + ", " + theme.light + ")";
      }
    });

  const cards = document.querySelectorAll(
    "#skills-section .grid > div, #portfolio .portfolio-item, #experience .timeline-card-left, #experience .timeline-card-right, #testimonials .testimonial-card > div, #contact .grid > div > a, #contact .grid > div > div:not([class*='from-primary'])",
  );
  cards.forEach(function (card) {
    card.style.removeProperty("border-color");
    if (!theme) {
      card.onmouseenter = null;
      card.onmouseleave = null;
      return;
    }
    card.onmouseenter = function () {
      card.style.borderColor = theme.light;
    };
    card.onmouseleave = function () {
      card.style.removeProperty("border-color");
    };
  });

  colorsGrid.querySelectorAll("button").forEach(function (circle, idx) {
    circle.classList.remove(
      "ring-2",
      "ring-offset-2",
      "ring-purple-400",
      "dark:ring-offset-slate-900",
      "scale-110",
    );
    if (theme && idx === themes.indexOf(theme)) {
      circle.classList.add(
        "ring-2",
        "ring-offset-2",
        "ring-purple-400",
        "dark:ring-offset-slate-900",
        "scale-110",
      );
    }
  });
}

settingsToggle.addEventListener("click", function () {
  settingsSidebar.classList.toggle("translate-x-full");
  applyTheme(currentTheme);
});

closeSettings.addEventListener("click", function () {
  settingsSidebar.classList.add("translate-x-full");
});

fontBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const font = btn.getAttribute("data-font");
    document.body.classList.remove(
      "font-alexandria",
      "font-tajawal",
      "font-cairo",
    );
    document.body.classList.add("font-" + font);

    fontBtns.forEach(function (b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");
    applyTheme(currentTheme);
  });
});

colorsGrid.className = "grid grid-cols-4 gap-4 place-items-center";
colorsGrid.innerHTML = "";

themes.forEach(function (theme, index) {
  const circle = document.createElement("button");
  circle.type = "button";
  circle.setAttribute("data-theme-index", index);
  circle.className =
    "w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-105";
  circle.style.background =
    "linear-gradient(180deg, " + theme.dark + ", " + theme.light + ")";

  circle.addEventListener("click", function () {
    applyTheme(theme);
  });

  colorsGrid.appendChild(circle);
});

window.addEventListener("scroll", function () {
  if (currentTheme) applyTheme(currentTheme);
});

document.querySelectorAll(".portfolio-filter").forEach(function (btn) {
  btn.addEventListener("click", function () {
    setTimeout(function () {
      applyTheme(currentTheme);
    }, 0);
  });
});

resetSettings.addEventListener("click", function () {
  document.body.classList.remove("font-alexandria", "font-cairo");
  document.body.classList.add("font-tajawal");
  fontBtns.forEach(function (b) {
    b.classList.remove("active");
  });
  applyTheme(null);
});

//SCROLL TO TOP BUTTON
const scrollTopBtn = document.querySelector("#scroll-to-top"); //[cite: 1]

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.remove("opacity-0", "invisible");
    scrollTopBtn.classList.add("opacity-100", "visible");
  } else {
    scrollTopBtn.classList.remove("opacity-100", "visible");
    scrollTopBtn.classList.add("opacity-0", "invisible");
  }
});

scrollTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
