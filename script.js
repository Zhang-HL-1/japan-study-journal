const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    mobileNav.hidden = isOpen;
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      mobileNav.hidden = true;
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !mobileNav.hidden) {
      menuButton.setAttribute("aria-expanded", "false");
      mobileNav.hidden = true;
      menuButton.focus();
    }
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// Match the scrollable results to the adjacent filter panel on two-column layouts.
const scopeFilters = document.querySelector(".scope-filters");
const scopeWorkspace = document.querySelector(".scope-workspace");
const scopeResults = document.querySelector("#scope-results");
if (scopeFilters && scopeWorkspace && scopeResults) {
  const alignScopeResults = () => {
    if (window.innerWidth <= 700 || scopeResults.hidden) return;
    const offset = scopeResults.getBoundingClientRect().top - scopeWorkspace.getBoundingClientRect().top;
    const height = Math.max(160, scopeFilters.getBoundingClientRect().height - offset);
    scopeResults.style.setProperty("--scope-results-height", height + "px");
  };
  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(alignScopeResults);
    [scopeFilters, ...scopeWorkspace.querySelectorAll(".scope-result-bar, .scope-list-hint")].forEach(node => observer.observe(node));
  }
  window.addEventListener("resize", alignScopeResults);
  alignScopeResults();
}
