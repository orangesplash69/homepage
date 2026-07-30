const pageTitles = [
  // "orangesplash.de - ",
  `Currently hosting ${projects.length} projects - `,
  ""
];
const scrollSpeed = 200; // Time in ms between title updates
const scrollStep = 1; // Number of characters to shift per update

const projects = [
  { name: "Example", description: "An example project.", url: "./example_url", github: "https://github.com/exampleuser/examplerepo", tags: ["Example", "Demo"] },
  { name: "Example 2", description: "Another example project.", url: "./example_url_2", github: "https://github.com/exampleuser/examplerepo-2", tags: ["Example", "Demo"] },
];

const grid = document.getElementById("projectGrid");
const searchInput = document.getElementById("searchInput");
const tagFilterRow = document.getElementById("tagFilterRow");
const activeFilter = document.getElementById("activeFilter");
const emptyState = document.getElementById("emptyState");

let activeTag = "";
let searchTerm = "";
let titleOffset = 0;
let titleTicker = null;
const titleSpacer = "   ";

const startTitleMarquee = () => {
  const filteredTitles = pageTitles.filter((title) => title && title.trim() !== "");
  if (!filteredTitles.length) return;

  const baseTitle = filteredTitles.join("") + titleSpacer;
  if (!baseTitle) return;

  const runTick = () => {
    if (document.hidden) return;
    const normalizedOffset = titleOffset % baseTitle.length;
    const nextTitle = baseTitle.slice(normalizedOffset) + baseTitle.slice(0, normalizedOffset);
    document.title = nextTitle;
    const safeStep = Number.isFinite(scrollStep) ? Math.max(1, Math.floor(scrollStep)) : 1;
    titleOffset = (titleOffset + safeStep) % baseTitle.length;
  };

  if (titleTicker) clearInterval(titleTicker);
  runTick();
  const safeSpeed = Number.isFinite(scrollSpeed) ? Math.max(30, Math.floor(scrollSpeed)) : 160;
  titleTicker = setInterval(runTick, safeSpeed);
  document.addEventListener("visibilitychange", runTick);
};

const uniqueTags = [...new Set(projects.flatMap((project) => project.tags))].sort();

const createTagButton = (tag) => {
  const button = document.createElement("button");
  button.className = "tag";
  button.type = "button";
  button.textContent = tag;
  button.addEventListener("click", () => {
    activeTag = activeTag === tag ? "" : tag;
    updateFilters();
  });
  return button;
};

const buildTagFilters = () => {
  tagFilterRow.innerHTML = "";
  uniqueTags.forEach((tag) => tagFilterRow.appendChild(createTagButton(tag)));
};

const buildCard = (project) => {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.name = project.name.toLowerCase();
  card.dataset.tags = project.tags.map((tag) => tag.toLowerCase()).join(" ");

  const title = document.createElement("h3");
  title.textContent = project.name;

  const description = document.createElement("p");
  description.textContent = project.description;

  const tagList = document.createElement("div");
  tagList.className = "tag-list";
  project.tags.forEach((tag) => {
    const tagChip = createTagButton(tag);
    tagChip.classList.add("mini-tag");
    tagList.appendChild(tagChip);
  });

  const actions = document.createElement("div");
  actions.className = "actions";

  const openBtn = document.createElement("button");
  openBtn.className = "open-btn";
  openBtn.type = "button";
  openBtn.textContent = "Open";
  openBtn.addEventListener("click", () => {
    window.open(project.url, "_blank", "noopener");
  });

  actions.appendChild(openBtn);
  if (project.github && project.github.trim() !== "") {
    const githubBtn = document.createElement("button");
    githubBtn.className = "ghost-btn";
    githubBtn.type = "button";
    githubBtn.textContent = "GitHub";
    githubBtn.addEventListener("click", () => {
      window.open(project.github, "_blank", "noopener");
    });
    actions.appendChild(githubBtn);
  }
  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(tagList);
  card.appendChild(actions);

  return card;
};

const renderProjects = () => {
  grid.innerHTML = "";
  const fragment = document.createDocumentFragment();
  projects.forEach((project) => fragment.appendChild(buildCard(project)));
  grid.appendChild(fragment);
};

const updateActiveFilterLabel = () => {
  if (!activeTag) {
    activeFilter.textContent = "";
    return;
  }

  activeFilter.innerHTML = `Filtering by tag: <strong>${activeTag}</strong>`;
  const clearBtn = document.createElement("button");
  clearBtn.type = "button";
  clearBtn.textContent = "Clear";
  clearBtn.addEventListener("click", () => {
    activeTag = "";
    updateFilters();
  });
  activeFilter.appendChild(clearBtn);
};

const syncTagButtons = () => {
  document.querySelectorAll(".tag").forEach((tagEl) => {
    const isActive = tagEl.textContent === activeTag;
    tagEl.classList.toggle("active", isActive);
  });
};

const updateVisibility = (card, shouldShow) => {
  if (shouldShow) {
    if (card.style.display === "none") {
      card.style.display = "";
      requestAnimationFrame(() => card.classList.remove("is-hidden"));
    } else {
      card.classList.remove("is-hidden");
    }
  } else {
    card.classList.add("is-hidden");
    setTimeout(() => {
      if (card.classList.contains("is-hidden")) {
        card.style.display = "none";
      }
    }, 220);
  }
};

const updateFilters = () => {
  const term = searchTerm.trim().toLowerCase();
  const cards = Array.from(grid.children);

  let visibleCount = 0;
  cards.forEach((card) => {
    const nameMatch = card.dataset.name.includes(term);
    const tagMatch = card.dataset.tags.includes(term);
    const matchesTerm = term ? nameMatch || tagMatch : true;
    const matchesTag = activeTag ? card.dataset.tags.includes(activeTag.toLowerCase()) : true;
    const shouldShow = matchesTerm && matchesTag;
    if (shouldShow) visibleCount += 1;
    updateVisibility(card, shouldShow);
  });

  emptyState.style.display = visibleCount === 0 ? "block" : "none";
  syncTagButtons();
  updateActiveFilterLabel();
};

searchInput.addEventListener("input", (event) => {
  searchTerm = event.target.value;
  updateFilters();
});

startTitleMarquee();
buildTagFilters();
renderProjects();
updateFilters();
