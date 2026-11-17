/* ===== MOBILE SIDEBAR ===== */
export function initSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const menuBtn = document.getElementById("menuBtn");
  const hideSidebar = document.getElementById("hideSidebar");

  menuBtn.setAttribute("aria-label", "Open menu");
  menuBtn.setAttribute("aria-expanded", "false");
  hideSidebar.setAttribute("aria-label", "Close menu");

  function openSidebar() {
    sidebar.classList.add("open");
    menuBtn.setAttribute("aria-expanded", "true");
  }

  function closeSidebar() {
    sidebar.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }

  menuBtn.addEventListener("click", openSidebar);
  hideSidebar.addEventListener("click", closeSidebar);
  sidebar
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", closeSidebar));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
  });

  document.addEventListener("click", (e) => {
    if (
      sidebar.classList.contains("open") &&
      !sidebar.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      closeSidebar();
    }
  });

  window.matchMedia("(min-width: 769px)").addEventListener("change", (e) => {
    if (e.matches) closeSidebar();
  });

  [menuBtn, hideSidebar].forEach((el) => {
    el.setAttribute("role", "button");
    el.tabIndex = 0;
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        el.click();
      }
    });
  });
}
