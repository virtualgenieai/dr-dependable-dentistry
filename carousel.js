/* DR DEPENDABLE DENTISTRY — dedicated interaction engine */
document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const track = document.querySelector("[data-gallery-track]");
  const previous = document.querySelector("[data-gallery-prev]");
  const next = document.querySelector("[data-gallery-next]");

  if (track) {
    const cards = Array.from(track.querySelectorAll(".case-card"));
    let scrollFrame = 0;

    const gapSize = () => {
      const styles = getComputedStyle(track);
      return parseFloat(styles.columnGap || styles.gap) || 22;
    };
    const getStep = () => {
      const card = cards[0];
      return card ? card.getBoundingClientRect().width + gapSize() : track.clientWidth * .8;
    };

    // Choose the card nearest the viewport's visual centre and animate its depth.
    const updateActiveCard = () => {
      scrollFrame = 0;
      if (!cards.length) return;
      const trackRect = track.getBoundingClientRect();
      const center = trackRect.left + trackRect.width / 2;
      let nearest = 0;
      let distance = Infinity;
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const delta = Math.abs(center - cardCenter);
        if (delta < distance) { distance = delta; nearest = index; }
      });
      cards.forEach((card, index) => {
        card.classList.toggle("is-gallery-active", index === nearest);
        card.classList.toggle("is-gallery-before", index === nearest - 1);
        card.classList.toggle("is-gallery-after", index === nearest + 1);
        if (index === nearest) card.setAttribute("aria-current", "true");
        else card.removeAttribute("aria-current");
      });
    };
    const requestActiveUpdate = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateActiveCard);
    };

    const move = (direction) => {
      const current = cards.findIndex(card => card.classList.contains("is-gallery-active"));
      const target = Math.max(0, Math.min(cards.length - 1, (current < 0 ? 0 : current) + direction));
      const card = cards[target];
      if (!card) return;
      const left = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
      track.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
    };

    previous?.addEventListener("click", () => move(-1));
    next?.addEventListener("click", () => move(1));
    track.addEventListener("scroll", requestActiveUpdate, { passive: true });
    window.addEventListener("resize", requestActiveUpdate, { passive: true });
    track.addEventListener("keydown", event => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        move(event.key === "ArrowRight" ? 1 : -1);
      }
    });

    // Recalculate once image dimensions are known; native touch scrolling stays intact.
    cards.forEach(card => {
      const img = card.querySelector("img");
      if (img && !img.complete) img.addEventListener("load", requestActiveUpdate, { once: true });
    });
    updateActiveCard();
    requestAnimationFrame(() => move(0));
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