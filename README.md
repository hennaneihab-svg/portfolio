# Portfolio - Ramy Hennane

[![Design](https://img.shields.io/badge/design-custom_glassmorphism-blue.svg)](#)
[![Stack](https://img.shields.io/badge/stack-HTML_/_CSS_/_JS_/_GSAP-emerald.svg)](#)
[![Deployment](https://img.shields.io/badge/deploy-GitHub_Pages-black.svg)](#)

> Official portfolio of Ramy Hennane, hybrid profile (Software Engineering & Quantitative Finance). Built as a fully static, high-performance web experience with GSAP animations and custom canvas interactions.

## Architecture & Tech Stack

This site is built entirely without frameworks (vanilla) to ensure maximum performance and zero dependency overhead, while still delivering a premium interactive experience.

*   **Markup:** HTML5 Semantic elements
*   **Styling:** CSS3 Custom Properties (Variables), Flexbox, CSS Grid, Glassmorphism, 3D Transforms
*   **Interactions:** Vanilla JavaScript (ES6+)
*   **Animations:** [GSAP 3](https://greensock.com/gsap/) (Tweening) + [ScrollTrigger](https://greensock.com/scrolltrigger/) (Scroll-linked animations)
*   **Visuals:** HTML5 Canvas (Interactive Dot Grid), SVG (Monogram, icons), Custom cursor

## Features

*   **Responsive Mobile-First Design:** Fully optimized for all screen sizes with a custom mobile navigation overlay.
*   **Interactive Hero Canvas:** A background grid of particles that magnetically reacts to mouse movement.
*   **Custom Cursor:** A smooth-following custom cursor with hover state transformations.
*   **Magnetic UI Elements:** Buttons and cards that subtly pull towards the user's cursor on hover.
*   **Scroll Reveal & Timelines:** Sections naturally fade and slide into view. Progress bars and vertical timelines draw themselves dynamically as the user scrolls.

## Local Development

Since this is a static site with CDN dependencies, no build tools are required. 
Simply clone the repository and open `index.html` in your browser.

```bash
git clone https://github.com/hennaneihab-svg/portfolio.git
cd portfolio
# Open index.html directly, or run a local server:
# python -m http.server 8000
```

## Contact

*   [LinkedIn - Ramy Hennane](https://linkedin.com/in/ramyhennane)
*   [GitHub - hennaneihab-svg](https://github.com/hennaneihab-svg)
*   Email: hennaneihab@gmail.com
