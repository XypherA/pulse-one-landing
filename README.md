# Pulse One — Product Landing Page

A responsive landing page for **Pulse One**, a fictional pair of premium wireless earbuds. It's built with plain HTML, CSS and vanilla JavaScript: no frameworks, no libraries and no build step.

**Live demo:** [xyphera.github.io/pulse-one-landing](https://xyphera.github.io/pulse-one-landing/)

## Features

- Sticky header with an accessible mobile menu (`aria-expanded`, closes on link click and <kbd>Esc</kbd>)
- Hero with a product illustration drawn entirely in inline SVG that changes with the theme
- Scroll-reveal animations powered by `IntersectionObserver`
- Features grid, "How it works" steps, a specs comparison table, pricing tiers and an FAQ accordion
- Newsletter form with client-side email validation and inline, screen-reader-announced messages
- Dark/light theme that follows the system setting by default and remembers your choice
- Responsive from 360px up to wide desktop, with no horizontal scrolling
- Respects `prefers-reduced-motion`

## Tech

- **HTML5** with semantic landmarks (`header`, `nav`, `main`, `section`, `footer`)
- **CSS3** with custom properties, Grid, Flexbox, `clamp()` and mobile-first media queries
- **JavaScript (ES modules)**, split into one file per responsibility
- **Inter** from Google Fonts

## Project structure

```
├── index.html
├── favicon.svg
├── css/
│   └── styles.css      # Tokens → base → components → media queries
└── js/
    ├── theme-init.js   # Sets the theme before first paint (classic script)
    ├── main.js         # Entry point, wires up the modules
    ├── theme.js        # Theme toggle and persistence
    ├── nav.js          # Mobile menu
    ├── reveal.js       # Scroll-reveal animations
    └── form.js         # Newsletter validation
```

## Running locally

Browsers block ES modules on `file://` URLs, so serve the folder over HTTP:

```bash
npx serve .
# or
python -m http.server
```

Then open the URL it prints.

## Key front-end decisions

**Why IntersectionObserver for scroll reveal?**
A `scroll` listener fires dozens of times per second and calling `getBoundingClientRect()` inside it forces layout work on every call. `IntersectionObserver` lets the browser tell us when an element enters the viewport, off the main thread. Each element is unobserved after it reveals, so no work happens once everything is visible. The hidden state only applies once JavaScript adds a `has-reveal` class to `<html>`, so if scripts fail or the user prefers reduced motion, all content is still visible.

**How theming works**
All colours are CSS custom properties on `:root`. The dark theme is one `:root[data-theme="dark"]` block that overrides only the colour tokens. A small blocking script in `<head>` (`theme-init.js`) reads `localStorage`, falls back to `prefers-color-scheme`, and sets `data-theme` *before the first paint*, which prevents a flash of the wrong theme. The toggle then switches the attribute and saves the choice. Until the user picks a theme, the page keeps following OS-level changes live.

**Accessibility**
- A skip link, a logical heading order and labelled sections and navs
- The menu button uses `aria-expanded` and `aria-controls`. Hidden menu links use `visibility: hidden` so they're out of the tab order, and <kbd>Esc</kbd> returns focus to the button
- The theme toggle is a toggle button (`aria-pressed`)
- The FAQ uses native `<details>`/`<summary>`, so it's keyboard- and screen-reader-friendly without any JS
- The specs table has a `<caption>` and `scope` attributes. Its scroll container is focusable so keyboard users can scroll it on small screens
- Form errors set `aria-invalid` and are announced through an `aria-live` region. Messages use `textContent`, never `innerHTML`
- Visible `:focus-visible` outlines, and text/background colour pairs chosen to meet WCAG AA contrast in both themes
- `prefers-reduced-motion` turns off the floating and reveal animations and smooth scrolling

## Credits

Built with AI-assisted development using [Claude Code](https://claude.com/claude-code). I reviewed, tested and refined all of the code.
