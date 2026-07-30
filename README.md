# Project Index

A fast, dark-mode personal project catalog.

Live demo of everything I build — searchable, filterable, and designed for quick navigation.

## Features

- **Search** — Filter projects by name or tag in real time
- **Tag filtering** — Click any tag to filter the grid (click again to clear)
- **Project cards** with:
  - Name & description
  - Tags
  - **Open** button (opens the live project)
  - **GitHub** button (when available)
- **Scrolling browser title** marquee
- Fully responsive dark UI with glassmorphism-style cards
- Smooth show/hide animations when filtering

## Currently Featured Projects

| Project       | Description                                      | Tags                  |
|---------------|--------------------------------------------------|-----------------------|
| **Example 1** | An example project.                              | Example, Demo         |
| **Example 2** | Another example project.                         | Example, Demo         |

## Tech Stack

- Vanilla HTML, CSS & JavaScript (no frameworks)
- Google Fonts (`Space Grotesk` + `Plus Jakarta Sans`)
- Modern CSS (CSS variables, backdrop-filter, clamp, grid)

## Project Structure

```
.
├── index.html      # Main page
├── style.css       # All styles
├── script.js       # Logic (projects, search, filters, title marquee)
└── README.md
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/orangesplash69/homepage.git
   cd homepage
   ```

2. Open `index.html` in your browser  
   (or use any static server, e.g. `npx serve`)

No build step required.

## Adding / Editing Projects

Open `script.js` and edit the `projects` array:

```js
const projects = [
  { name: "Project Name", description: "Short description of what it does.", url: "https://your-project-url.com", github: "https://github.com/username/repo", tags: ["Tag1", "Tag2"] },
  // You can leave GitHub and Tags empty to hide the buttons
];
```

That’s it — the grid, tags, and filters update automatically.

## Customization

| Setting              | Location          | Description                          |
|----------------------|-------------------|--------------------------------------|
| Page title marquee   | `pageTitles`      | Text that scrolls in the browser tab |
| Scroll speed         | `scrollSpeed`     | Milliseconds between title updates   |
| Colors & theme       | `style.css` (`:root`) | Easy to change accent colors      |

## License

Feel free to copy but leave credits in the code and yes, its vibe coded
