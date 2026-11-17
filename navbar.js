// NAV ACTIVE STATE (scroll spy)
export function initNavActive() {
  const links = [
    ...document.querySelectorAll('.navbar a[href^="#"]:not([href="#"])'),
  ];

  // unique target sections, in page order
  const sections = [
    ...new Set(
      links
        .map((l) => document.getElementById(l.hash.slice(1)))
        .filter(Boolean),
    ),
  ].sort((a, b) =>
    a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
  );

  if (!sections.length) return;

  let current = null;

  const update = () => {
    const offset = window.innerHeight * 0.35;
    let next = sections[0];

    for (const s of sections) {
      if (s.getBoundingClientRect().top <= offset) next = s;
    }

    // at the very bottom of the page, the last section wins
    const atBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2;
    if (atBottom) next = sections[sections.length - 1];

    if (next === current) return;
    current = next;

    links.forEach((l) => {
      const isActive = l.hash === `#${current.id}`;
      l.classList.toggle("active", isActive);
      if (isActive) l.setAttribute("aria-current", "true");
      else l.removeAttribute("aria-current");
    });
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("hashchange", onScroll);
  update();
}
