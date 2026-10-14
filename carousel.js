/* DR DEPENDABLE DENTISTRY — dedicated interaction engine */
document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const track = document.querySelector("[data-gallery-track]");
  const previous = document.querySelector("[data-gallery-prev]");
  const next = document.querySelector("[data-gallery-next]");

  if (track) {
    const cards = Array.from(track.querySelectorAll(".case-card"));
    let scrollFrame = 0;
    let autoTimer = null;
    let galleryVisible = true;
    let userInteracting = false;
    let interactionTimer = null;

    const getActiveIndex = () => {
      if (!cards.length) return 0;
      const center = track.getBoundingClientRect().left + track.clientWidth / 2;
      let nearest = 0;
      let distance = Infinity;
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const delta = Math.abs(center - (rect.left + rect.width / 2));
        if (delta < distance) { distance = delta; nearest = index; }
      });
      return nearest;
    };

    const updateActiveCard = () => {
      scrollFrame = 0;
      const active = getActiveIndex();
      cards.forEach((card, index) => {
        card.classList.toggle("is-gallery-active", index === active);
        if (index === active) card.setAttribute("aria-current", "true");
        else card.removeAttribute("aria-current");
      });
    };
    const requestActiveUpdate = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateActiveCard);
    };

    const moveTo = (index, behavior = "smooth") => {
      if (!cards.length) return;
      const safeIndex = (index + cards.length) % cards.length;
      const card = cards[safeIndex];
      const left = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
      track.scrollTo({ left, behavior: reduceMotion ? "auto" : behavior });
      updateActiveCard();
    };
    const move = (direction) => moveTo(getActiveIndex() + direction);

    const stopAuto = () => {
      if (autoTimer) window.clearInterval(autoTimer);
      autoTimer = null;
    };
    const startAuto = () => {
      stopAuto();
      if (reduceMotion || cards.length < 2 || !galleryVisible || userInteracting || document.hidden) return;
      autoTimer = window.setInterval(() => move(1), 4000);
    };
    const noteInteraction = () => {
      userInteracting = true;
      startAuto();
      window.clearTimeout(interactionTimer);
      interactionTimer = window.setTimeout(() => {
        userInteracting = false;
        startAuto();
      }, 9000);
    };

    previous?.addEventListener("click", () => { noteInteraction(); move(-1); });
    next?.addEventListener("click", () => { noteInteraction(); move(1); });
    track.addEventListener("scroll", requestActiveUpdate, { passive: true });
    track.addEventListener("pointerdown", noteInteraction, { passive: true });
    track.addEventListener("focusin", () => { userInteracting = true; stopAuto(); });
    track.addEventListener("focusout", () => { userInteracting = false; startAuto(); });
    track.addEventListener("keydown", event => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        noteInteraction();
        move(event.key === "ArrowRight" ? 1 : -1);
      }
    });
    const toolbar = document.querySelector(".gallery-toolbar");
    toolbar?.addEventListener("mouseenter", stopAuto);
    toolbar?.addEventListener("mouseleave", startAuto);
    track.addEventListener("mouseenter", stopAuto);
    track.addEventListener("mouseleave", startAuto);
    document.addEventListener("visibilitychange", startAuto);
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(entries => {
        galleryVisible = entries.some(entry => entry.isIntersecting);
        startAuto();
      }, { threshold: 0.15 });
      observer.observe(track);
    }
    window.addEventListener("resize", requestActiveUpdate, { passive: true });
    cards.forEach(card => {
      const img = card.querySelector("img");
      if (img && !img.complete) img.addEventListener("load", requestActiveUpdate, { once: true });
    });
    updateActiveCard();
    requestAnimationFrame(() => moveTo(0, "auto"));
    startAuto();
  }

  // Seamless text-only review lanes.
  document.querySelectorAll(".reviews-track").forEach(reviewTrack => {
    if (reviewTrack.dataset.loopReady === "true") return;
    Array.from(reviewTrack.children).forEach(card => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.querySelectorAll("a, button, input, select, textarea").forEach(control => control.setAttribute("tabindex", "-1"));
      reviewTrack.appendChild(clone);
    });
    reviewTrack.dataset.loopReady = "true";
  });
  document.querySelectorAll(".reviews-lane").forEach(lane => {
    lane.addEventListener("focusin", () => lane.classList.add("is-paused"));
    lane.addEventListener("focusout", event => {
      if (!lane.contains(event.relatedTarget)) lane.classList.remove("is-paused");
    });
  });
  if (reduceMotion) {
    document.querySelectorAll(".reviews-track").forEach(track => {
      track.style.animation = "none";
      track.style.transform = "none";
    });
  }
});