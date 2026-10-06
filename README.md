# Portfolio Website

A responsive, single-page personal portfolio built with plain HTML, CSS, and JavaScript. No frameworks and no build step.

**Live site:** `ADD_LIVE_URL`

## Features

- Responsive layout for desktop, tablet, and mobile
- Sections: Home, About, Education, Stack, Experience, Projects, Certifications, Resume, Contact
- Scroll-reveal animations and a custom cursor
- Embedded PDF resume with open, download, and browser-based upload buttons
- Accessible markup with reduced-motion support

## Tech Used

- HTML5
- CSS3 (custom properties, grid, flexbox)
- Vanilla JavaScript
- Google Fonts

## Project Structure

```text
.
├── index.html
├── styles.css
├── script.js
└── assets/
```

## Run Locally

```bash
git clone https://github.com/USERNAME/REPO.git
cd REPO
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser. You can also open `index.html` directly.

The Resume section accepts PDF uploads and immediately uses the selected file
for viewing and downloading during the current browser visit. Because this is
a static site, uploaded files are not saved to the server; replace
`assets/Akanksha_Devops.pdf` to publish a new default resume.

## Deploy

Works on any static host: GitHub Pages, Vercel, or Netlify. No build command is needed.

## License

All rights reserved. Please don't copy the content or personal details.
