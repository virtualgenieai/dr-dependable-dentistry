
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

  // Automatically update the footer copyright year.
  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = String(
      new Date().getFullYear()
    );
  }
});
