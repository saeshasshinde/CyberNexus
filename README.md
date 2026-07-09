# CYBERNEXUS — Premium Cyberpunk Cyborg Landing Page

[![HTML5 Badge](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3 Badge](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript Badge](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License Badge](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **Beyond Human. Beyond Limits.** A next-generation responsive landing page for a cybernetic and neural enhancement technology firm. Built with modern UI/UX principles, featuring vibrant glassmorphism, responsive grids, and advanced scroll-triggered visual interactions.

---

## 👁️ Overview

**CYBERNEXUS** is a frontend landing page demonstrating an elite AI and human-augmentation corporation. Eschewing cliché gaming elements in favor of a sleek, premium, and corporate sci-fi aesthetic, the project highlights cybernetic developments such as direct neural interfaces, smart vision ocular implants, and adaptive robotic prosthetics.

---

## ⚡ Features

- **Futuristic Dark Theme**: Sleek deep-navy radial gradients highlighted with neon-cyan, electric-blue, and purple glowing borders.
- **Glassmorphic UI**: Semi-transparent card backdrops built with CSS `backdrop-filter` and soft, contextual shadows.
- **Interactive Particle System**: High-performance, lightweight HTML5 Canvas-based background animation that interacts dynamically with cursor movement.
- **Custom Glow Cursor**: Smoothly interpolated (`lerp`) trailing neon dot-and-ring mouse pointer that responds with hover scaling over buttons and links.
- **Adaptive Scroll Reveal**: Smooth fade-in and slide animations using the JavaScript `IntersectionObserver` API.
- **Dynamically Animated Counters**: Numerical statistics that count up rapidly once scrolled into viewport.
- **Horizontal Innovations Timeline**: Smoothly scrolling interactive roadmap showcasing biological-silicon evolution milestones from 2025 to 2050.
- **FAQ Accordion**: Clean interactive FAQ grid with smooth, height-calculated collapse and expand transitions.
- **Cyber-styled Contact Form**: Encrypted-themed text-fields featuring dynamic verification feedback loops and mock node transmission status indicators.

---

## 🛠️ Technologies Used

- **Markup**: HTML5 (Clean, semantic hierarchy optimized for SEO and screen-readers).
- **Styling**: CSS3 (Modern custom variables, Flexbox, CSS Grid layouts, and custom keyframe animations).
- **Behavior**: Vanilla JavaScript (ES6+, zero external runtime library dependencies).
- **Vector Icons**: Lucide Icons (Rendered dynamically via CDN integration).
- **Typography**: Google Fonts (Orbitron for headings, Inter for body copy).

---

## 🖥️ Screen Previews & Visuals

Here is where screenshots of the desktop and mobile layouts will render:

### Desktop Mockup
![Desktop Preview Layout](assets/cyborg_hero.png)

### Mobile & Tablet Responsiveness
> The layout scales dynamically using CSS media queries to support smartphones, tablets, and ultrawide screens.

---

## 📂 Project Directory Structure

A clean, modular, and frontend-only file structure designed for seamless hosting:

```text
cybernexus/
├── index.html       # Primary HTML template with semantic layout & SEO tags
├── style.css        # CSS design system, variables, glassmorphism & layout styles
├── main.js         # Interactive cursor, canvas particles, counters & form logic
└── assets/          # Custom high-fidelity illustrations & graphic assets
    ├── cyborg_hero.png
    ├── neural_interface.png
    ├── robotic_prosthetics.png
    └── smart_vision.png
```

---

## 🚀 How to Run the Project Locally

Because this project is a frontend-only static website, you do not need any complex build configurations. You can run it locally using any of the following methods:

### Method 1: Direct File Opening
1. Download or clone this repository.
2. Navigate into the `frontend/` directory.
3. Double-click the `index.html` file to open it directly in any web browser (Chrome, Edge, Firefox, Safari).

### Method 2: Node.js (Recommended static server)
If you want to serve the files locally via HTTP to ensure optimal caching and file paths:
1. Ensure you have [Node.js](https://nodejs.org) installed.
2. Open your terminal in the `frontend/` directory and run:
   ```bash
   npx http-server -p 8080
   ```
3. Open your browser and navigate to: **`http://localhost:8080`**

### Method 3: Python Server
1. Ensure Python is installed on your computer.
2. Open terminal in the `frontend/` directory and run:
   - For Python 3.x:
     ```bash
     python -m http.server 8080
     ```
   - For Python 2.x:
     ```bash
     python -m SimpleHTTPServer 8080
     ```
3. Open your browser and navigate to: **`http://localhost:8080`**

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE details for permissions.
