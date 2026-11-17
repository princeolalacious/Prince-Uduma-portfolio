export function initTheme() {
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector("i");

  function currentTheme() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function paintThemeUI() {
    const isDark = currentTheme() === "dark";
    themeIcon.className = isDark ? "fa-solid fa-moon" : "fa-solid fa-sun";
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode",
    );
  }

  themeToggle.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    paintThemeUI();
  });

  /* keyboard access (the toggle is an <li>) */
  themeToggle.setAttribute("role", "button");
  themeToggle.tabIndex = 0;
  themeToggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      themeToggle.click();
    }
  });

  paintThemeUI();
}
