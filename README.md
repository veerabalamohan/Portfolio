# Mohan Nalluri | Portfolio

A single-page personal portfolio for a **Hardware & Software Engineer**. It has a dark navy theme with a neon-blue animated network background, a typewriter hero heading, and colour-accented cards for skills, experience and projects.

Built with plain HTML, CSS and JavaScript. Tailwind CSS and Font Awesome are loaded from a CDN, so there is no build step.

---

## Sections

| Section | What it shows |
| --- | --- |
| **Hero** | Typewriter heading, short intro, and the current role at Linkwell Telesystems Pvt Ltd |
| **Technical Skills** | Hardware and Software cards, plus a Protocols row (UART, I2C, SPI, CAN, RS-485, DLMS) |
| **Professional Experience** | Timeline with the Engineer role, 2024 to present |
| **Featured Engineering Projects** | MICRO INVERTER CONFIG TOOL, SMD PCB Reverse Engineering, Bluetooth Module & Smart Energy Meter, Time-Limited Control System (OTP) |
| **Contact** | Email, phone, LinkedIn and GitHub links |

---

## Features

- **Animated network background**: a canvas of drifting nodes, data packets and floating protocol labels (UART, I2C, SPI, CAN, DLMS, RS-485).
- **Typewriter heading**: types out character by character with a blinking caret. It wraps on small screens and always finishes.
- **Scroll reveal**: headings and cards fade up in sequence as they enter the screen.
- **Hover effects**: cards lift and glow, with a spotlight that follows the cursor; chips, buttons, links and social icons all react.
- **Navigation helpers**: scroll progress bar, active-section highlight in the nav, a header that deepens on scroll, and a back-to-top button.
- **Colour accents**: each card has its own accent colour (cyan, violet, pink, mint or amber) on top of the neon-blue base.
- **Theme-aware favicon**: a black MN logo on light browser themes and a white one on dark themes.
- **Reduced motion**: animations switch off for visitors who have "reduce motion" enabled.
- **Responsive**: works from phone to desktop.

---

## Project structure

```
portfolio/
├── index.html              # Page markup (all sections)
├── README.md
├── assets/
│   ├── logo-white.png      # Logo shown in the header
│   ├── favicon-black.png   # Tab icon for light browser themes
│   ├── favicon-white.png   # Tab icon for dark browser themes
│   └── apple-touch-icon.png
├── css/
│   └── style.css           # Custom styles, animations, hover effects, colour accents
└── js/
    ├── tailwind-config.js  # Tailwind theme colours (must load after the Tailwind CDN script)
    ├── network.js          # Canvas network animation
    └── main.js             # Typewriter, scroll reveal, progress bar, nav highlight, back-to-top
```

The files are linked with relative paths, so keep this folder structure as it is.

---

## Getting started

### Open it locally

Open `index.html` in a browser. You need an internet connection, because Tailwind CSS and Font Awesome load from a CDN.

If you prefer a local server:

```bash
cd portfolio
python3 -m http.server 8000
# then visit http://localhost:8000
```

### Deploy

It is a static site, so any static host works, for example GitHub Pages, Netlify or Vercel.

For GitHub Pages: push the folder to a repository, then go to **Settings > Pages** and select the branch and root folder.

---

## Customising

### Change the hero heading

In `index.html`, edit the `data-text` attribute on the `<h1 id="hero-title">`, and keep the text inside the tag the same so the heading still shows if JavaScript is off.

```html
<h1 id="hero-title" class="hero-title ..." data-text="Your heading here">
    Your heading here
</h1>
```

Typing speed and the start delay are set in `js/main.js` (search for `START_DELAY`).

### Add a project

Copy any project card inside the `#projects` grid and change the icon, title, description and chips. Pick a colour by changing the accent class on the card.

```html
<div class="glass-card reveal accent-violet p-5 rounded-lg">
```

Available accents: `accent-cyan`, `accent-violet`, `accent-pink`, `accent-mint`, `accent-amber`. They are defined at the bottom of `css/style.css`.

### Add a role to the timeline

In the `#experience` section, duplicate the block that starts with `<div class="relative pl-8">` and edit the title, company, dates and bullet points.

### Change the colours

- **Theme colours** such as `neonBlue` and `deepBlue`: `js/tailwind-config.js`.
- **Accent colours** and gradients: the "Colour accents" section at the end of `css/style.css`.
- **Network animation colour**: the `rgba(0, 210, 255, ...)` values in `js/network.js`.

### Replace the logo and favicon

Overwrite the files in `assets/` and keep the same file names:

- `logo-white.png`: transparent PNG with a white logo (shown in the header).
- `favicon-white.png` and `favicon-black.png`: the two tab icons.
- `apple-touch-icon.png`: icon for phone home screens.

### Update contact details

Edit the email, phone and social links in the `#contact` section of `index.html`.

---

## Tech stack

- HTML5, CSS3, vanilla JavaScript
- [Tailwind CSS](https://tailwindcss.com/) via the CDN script
- [Font Awesome 6.4](https://fontawesome.com/) via cdnjs
- HTML Canvas for the background animation

---

## Browser support

Current versions of Chrome, Edge, Firefox and Safari. The theme-aware favicon works in Chrome and Firefox; Safari may show a single icon.

---

## Known limitations

- **No mobile menu**: the top navigation is hidden on small screens. Visitors scroll through the sections instead.
- **CDN dependency**: the page needs internet access for Tailwind and Font Awesome. For a production site, replace the Tailwind CDN script with a compiled stylesheet using the Tailwind CLI, which is also faster to load.

---

## Contact

- Email: nallurimohan999@gmail.com
- LinkedIn: [linkedin.com/in/mohan-nalluri](https://linkedin.com/in/mohan-nalluri)
- GitHub: [github.com/veerabalamohan](https://github.com/veerabalamohan)
