/* ============================================================
   YUVRJ PORTFOLIO — script.js
   ============================================================ */

(function () {
  "use strict";

  /* ── CUSTOM CURSOR ───────────────────────────────────────── */
  const cursor = document.getElementById("cursor");
  const trail  = document.getElementById("cursorTrail");

  let trailX = 0, trailY = 0;

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top  = e.clientY + "px";

    // Lagged trail
    setTimeout(() => {
      trail.style.left = e.clientX + "px";
      trail.style.top  = e.clientY + "px";
    }, 80);
  });

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll(
    "a, button, .info-card, .skill-group, .project-card, .edu-card, .contact-item, .pill"
  );
  hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hovered"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hovered"));
  });

  /* ── NAVBAR SCROLL ───────────────────────────────────────── */
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }, { passive: true });

  /* ── MOBILE MENU ─────────────────────────────────────────── */
  const burger     = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobLinks   = document.querySelectorAll(".mob-link");

  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
    document.body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "";
  });

  mobLinks.forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("open");
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  /* ── INTERSECTION OBSERVER — scroll reveals ──────────────── */
  const revealOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.index ? parseInt(el.dataset.index) * 120 : 0;
        setTimeout(() => el.classList.add("visible"), delay);
        observer.unobserve(el);
      }
    });
  }, revealOptions);

  // Observe timeline items
  document.querySelectorAll(".timeline-item").forEach((el) => observer.observe(el));

  // Observe project cards
  document.querySelectorAll(".project-card").forEach((el) => observer.observe(el));

  /* ── SECTION HEADER FADE-IN ──────────────────────────────── */
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          sectionObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".section-header, .about-grid, .skills-grid, .edu-grid, .contact-content").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = "opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)";
    sectionObserver.observe(el);
  });

  /* ── SMOOTH ACTIVE NAV HIGHLIGHT ─────────────────────────── */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  const activeSectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((a) => {
            if (a.getAttribute("href") === "#" + id) {
              a.style.color = "var(--amber)";
            } else {
              a.style.color = "";
            }
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((sec) => activeSectionObserver.observe(sec));

  /* ── STAGGERED SKILL PILLS ANIMATION ─────────────────────── */
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const pills = entry.target.querySelectorAll(".pill");
          pills.forEach((pill, i) => {
            pill.style.opacity = "0";
            pill.style.transform = "translateY(8px) scale(0.95)";
            pill.style.transition = `opacity 0.4s ${i * 50}ms ease, transform 0.4s ${i * 50}ms ease`;
            setTimeout(() => {
              pill.style.opacity = "1";
              pill.style.transform = "none";
            }, 100 + i * 50);
          });
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll(".skill-group").forEach((g) => skillObserver.observe(g));

  /* ── EDUCATION CARD STAGGER ──────────────────────────────── */
  const eduObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = document.querySelectorAll(".edu-card");
          cards.forEach((card, i) => {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            card.style.transition = `opacity 0.5s ${i * 120}ms ease, transform 0.5s ${i * 120}ms ease`;
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "none";
            }, 150 + i * 120);
          });
          eduObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  const eduGrid = document.querySelector(".edu-grid");
  if (eduGrid) eduObserver.observe(eduGrid);

  /* ── INFO CARD STAGGER ───────────────────────────────────── */
  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = document.querySelectorAll(".info-card");
          cards.forEach((card, i) => {
            card.style.opacity = "0";
            card.style.transform = "translateY(16px)";
            card.style.transition = `opacity 0.45s ${i * 80}ms ease, transform 0.45s ${i * 80}ms ease`;
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "none";
            }, 100 + i * 80);
          });
          aboutObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );

  const aboutInfoCards = document.querySelector(".about-info-cards");
  if (aboutInfoCards) aboutObserver.observe(aboutInfoCards);

  /* ── TILT EFFECT ON PROJECT CARDS ────────────────────────── */
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-4px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.transition = "transform 0.5s ease";
    });
    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform 0.1s linear, border-color 0.3s, background 0.3s";
    });
  });

  /* ── CONTACT LINK RIPPLE ─────────────────────────────────── */
  document.querySelectorAll(".contact-item").forEach((item) => {
    item.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px; height: ${size}px;
        border-radius: 50%;
        background: rgba(212,134,42,0.15);
        top: ${e.clientY - rect.top - size / 2}px;
        left: ${e.clientX - rect.left - size / 2}px;
        transform: scale(0);
        animation: rippleEffect 0.5s ease forwards;
        pointer-events: none;
      `;
      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });

  // Inject ripple keyframes
  const style = document.createElement("style");
  style.textContent = `
    @keyframes rippleEffect {
      to { transform: scale(2.5); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  /* ── HERO TEXT GLITCH HOVER ──────────────────────────────── */
  const glitchTargets = document.querySelectorAll("[data-text]");
  glitchTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      el.classList.add("glitch");
      setTimeout(() => el.classList.remove("glitch"), 600);
    });
  });

  // Inject glitch styles
  const glitchStyle = document.createElement("style");
  glitchStyle.textContent = `
    @keyframes glitch1 {
      0%,100% { clip-path: inset(0 0 90% 0); transform: translateX(-4px); }
      25%      { clip-path: inset(20% 0 60% 0); transform: translateX(4px); }
      50%      { clip-path: inset(60% 0 20% 0); transform: translateX(-2px); }
      75%      { clip-path: inset(80% 0 5% 0);  transform: translateX(2px); }
    }
    .glitch {
      position: relative;
    }
    .glitch::before {
      content: attr(data-text);
      position: absolute;
      top: 0; left: 0;
      color: #e9a84c;
      animation: glitch1 0.3s steps(2) 2;
      pointer-events: none;
    }
  `;
  document.head.appendChild(glitchStyle);

  /* ── TYPING EFFECT on hero-title ─────────────────────────── */
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const original = heroTitle.textContent;
    heroTitle.textContent = "";
    let i = 0;
    const typeInterval = setInterval(() => {
      heroTitle.textContent += original[i];
      i++;
      if (i >= original.length) clearInterval(typeInterval);
    }, 40);
  }

  /* ── YEAR IN FOOTER ──────────────────────────────────────── */
  // Already hardcoded in HTML as 2025; update dynamically if needed
  const footerCopy = document.querySelector(".footer-copy");
  if (footerCopy) {
    footerCopy.textContent = footerCopy.textContent.replace("2025", new Date().getFullYear());
  }

})();