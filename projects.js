/* ===== EDIT YOUR PROJECTS HERE =====
   Leave demo or repo as "" to hide that button. */
const projects = [
  {
    title: "Meal Recipe Finder",
    summary:
      "Find recipes by dish or ingredients, with filters and random discovery.",
    stack: ["HTML", "CSS", "JavaScript"],
    hosting: "Vercel",
    image: "image/mealrecipe.png",
    demo: "https://healthy-meal-recipe.vercel.app/",
    repo: "https://github.com/princeolalacious/meal-recipe",
  },
  {
    title: "CineCrush: Movie Discovery App",
    summary: "Discover trending movies, filter films, and save your watchlist.",
    stack: ["React", "Vite", "Tailwind CSS"],
    hosting: "Netlify",
    image: "image/cinecrush.png",
    demo: "https://cinecrush.netlify.app/",
    repo: "https://github.com/princeolalacious/CineCrushmovie",
  },
  {
    title: "Tenzies",
    summary: "Roll and freeze dice until all ten show the same number.",
    stack: ["React", "Vite", "Tailwind CSS"],
    hosting: "Vercel",
    image: "image/tenzies.png",
    demo: "https://tenziesgame-two.vercel.app/",
    repo: "https://github.com/princeolalacious/Tenzies-Game",
  },
  {
    title: "Planetary Facts",
    summary: "Explore and compare facts about planets across our solar system.",
    stack: ["HTML", "CSS", "JavaScript"],
    hosting: "Netlify",
    image: "image/planetary.png",
    demo: "https://Planetaryfacts-grp12.netlify.app",
    repo: "https://github.com/princeolalacious/TSA-GROUP-12",
  },
];

function renderProject(p, i) {
  const num = String(i + 1).padStart(2, "0");

  const chips = p.stack.map((item) => `<li>${item}</li>`).join("");

  const links = [
    p.demo
      ? `<a class="lets_connect" href="${p.demo}" target="_blank" rel="noopener noreferrer">Live Demo</a>`
      : "",
    p.repo
      ? `<a class="download_cv" href="${p.repo}" target="_blank" rel="noopener noreferrer">GitHub</a>`
      : "",
  ].join("");

  return `
    <li class="project_item">
      <article class="project_card">
        <figure class="project_preview">
          <img src="${p.image}" alt="${p.title} preview" loading="lazy" />
        </figure>
        <div class="project_card_body">
          <span class="project_num">${num}</span>
          <h3 class="project_title">${p.title}</h3>
          <p class="project_summary">${p.summary}</p>
          <ul class="chips project_stack" aria-label="Technologies used">${chips}</ul>
          <div class="project_card_footer">
            <p class="project_hosting">Deployed on ${p.hosting}</p>
            <div class="project_actions">${links}</div>
          </div>
        </div>
      </article>
    </li>`;
}

export function initProjects() {
  const list = document.getElementById("projectList");
  if (!list) return;

  list.innerHTML = projects.map(renderProject).join("");

  list.addEventListener(
    "error",
    (e) => {
      if (e.target.tagName === "IMG") e.target.classList.add("is-missing");
    },
    true,
  );
}
