/* =========================================
   DR DEPENDABLE DENTISTRY
   Dedicated clinical + review carousel engine
========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Clinical work: accessible horizontal carousel with scroll-snap.
  const track = document.querySelector("[data-gallery-track]");
  const previous = document.querySelector("[data-gallery-prev]");
  const next = document.querySelector("[data-gallery-next]");

  if (track) {
    const getStep = () => {
      const card = track.querySelector(".case-card");
      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap) || 22;
      return card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.85;
    };

    previous?.addEventListener("click", () => {
      track.scrollBy({ left: -getStep(), behavior: reduceMotion ? "auto" : "smooth" });
    });
    next?.addEventListener("click", () => {
      track.scrollBy({ left: getStep(), behavior: reduceMotion ? "auto" : "smooth" });
    });

    // Keep the arrow buttons useful when a visitor uses a keyboard.
    track.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      track.scrollBy({
        left: (event.key === "ArrowRight" ? 1 : -1) * getStep(),
        behavior: reduceMotion ? "auto" : "smooth"
      });
    });
  }

  // Review marquee: duplicate each lane once for a seamless loop.
  document.querySelectorAll(".reviews-track").forEach((reviewTrack) => {
    if (reviewTrack.dataset.loopReady === "true") return;
    const originalCards = Array.from(reviewTrack.children);
    originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.querySelectorAll("a, button, input, select, textarea").forEach((control) => {
        control.setAttribute("tabindex", "-1");
      });
      reviewTrack.appendChild(clone);
    });
    reviewTrack.dataset.loopReady = "true";
  });

  // Pause movement when the user hovers or focuses a review lane.
  document.querySelectorAll(".reviews-lane").forEach((lane) => {
    lane.addEventListener("focusin", () => lane.classList.add("is-paused"));
    lane.addEventListener("focusout", (event) => {
      if (!lane.contains(event.relatedTarget)) lane.classList.remove("is-paused");
    });
  });

  if (reduceMotion) {
    document.querySelectorAll(".reviews-track").forEach((reviewTrack) => {
      reviewTrack.style.animation = "none";
      reviewTrack.style.transform = "none";
    });
  }
});
