
/* =========================================
   DR DEPENDABLE DENTISTRY
   Accessible navigation and small enhancements
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");
  const mobileQuery = window.matchMedia("(max-width: 760px)");

  if (menuToggle && mainNav) {
    const setMenuOpen = (open) => {
      const shouldOpen = open && mobileQuery.matches;

      mainNav.classList.toggle("is-open", shouldOpen);

      menuToggle.setAttribute(
        "aria-expanded",
        String(shouldOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        shouldOpen
          ? "Close navigation menu"
          : "Open navigation menu"
      );
    };

    // Open and close the mobile navigation.
    menuToggle.addEventListener("click", () => {
      const currentlyOpen =
        mainNav.classList.contains("is-open");

      setMenuOpen(!currentlyOpen);
    });

    // Close the menu after a navigation link is selected.
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        setMenuOpen(false);
      });
    });

    // Close the menu when Escape is pressed.
    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        mainNav.classList.contains("is-open")
      ) {
        setMenuOpen(false);
        menuToggle.focus();
      }
    });

    // Reset navigation when switching between mobile and desktop.
    const handleBreakpointChange = () => {
      setMenuOpen(false);
    };

    if (typeof mobileQuery.addEventListener === "function") {
      mobileQuery.addEventListener(
        "change",
        handleBreakpointChange
      );
    } else {
      // Compatibility with older browsers.
      mobileQuery.addListener(handleBreakpointChange);
    }
  }


  // Reveal cards and section content as they enter the viewport.
  const motionElements = document.querySelectorAll(
    '.treatment-card, [data-reveal]'
  );
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('motion-ready');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const siblings = Array.from(entry.target.parentElement?.children || []);
        const index = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${Math.min(Math.max(index, 0) % 5, 4) * 75}ms`;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    motionElements.forEach((element) => revealObserver.observe(element));
  } else {
    motionElements.forEach((element) => element.classList.add('is-visible'));
  }

  // Native horizontal clinical gallery with dedicated arrow controls.
  const galleryTrack = document.querySelector('[data-gallery-track]');
  const galleryPrev = document.querySelector('[data-gallery-prev]');
  const galleryNext = document.querySelector('[data-gallery-next]');
  const scrollGallery = (direction) => {
    if (!galleryTrack) return;
    const firstCard = galleryTrack.querySelector('.case-card');
    const gap = parseFloat(getComputedStyle(galleryTrack).columnGap) || 20;
    const distance = firstCard ? firstCard.getBoundingClientRect().width + gap : galleryTrack.clientWidth * 0.8;
    galleryTrack.scrollBy({ left: direction * distance, behavior: reduceMotion ? 'auto' : 'smooth' });
  };
  galleryPrev?.addEventListener('click', () => scrollGallery(-1));
  galleryNext?.addEventListener('click', () => scrollGallery(1));

  // Duplicate each review lane's cards once so the marquee loops without a visible gap.
  document.querySelectorAll('.reviews-track').forEach((track) => {
    if (track.dataset.loopReady === 'true') return;
    Array.from(track.children).forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('a, button').forEach((control) => control.setAttribute('tabindex', '-1'));
      track.appendChild(clone);
    });
    track.dataset.loopReady = 'true';
  });

  // Automatically update the footer copyright year.
  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = String(
      new Date().getFullYear()
    );
  }
});
