# Assembly-Endgame

A fast, accessible word-guessing game built with React and Vite. Guess the hidden word by selecting letters. You have 8 wrong guesses before the programming world falls to Assembly.

## Gameplay

- A random English word is selected at the start of each game.
- Click letters to guess; correct letters are revealed in place.
- You lose after 8 incorrect guesses.
- Visual feedback includes:
  - Color-coded remaining guesses indicator (good → warn → danger)
  - Language chips that “die” one-by-one with a skull overlay per wrong guess
  - Farewell message for each lost language
  - Confetti on win

## Tech

- React + Vite
- clsx (conditional classes)
- react-use (window size utilities)
- react-confetti (win animation)

## Scripts

- Dev server: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`
- Preview build: `npm run preview`
- Deploy to GitHub Pages: `npm run deploy`

## Local Development

1. Install dependencies

```
npm install
```

2. Start the dev server

```
npm run dev
```

## Deployment (GitHub Pages)

This project is preconfigured for GitHub Pages using `gh-pages` and Vite’s `base` set to `/Assembly-Endgame/`.

1. Ensure your repository is pushed to GitHub: `origin` → `main`.
2. Deploy the latest build:

```
npm run deploy
```

This publishes the contents of `dist/` to the `gh-pages` branch. In your GitHub repo settings, enable Pages and select the `gh-pages` branch as the source. Your site will be available at:

```
https://<your-username>.github.io/Assembly-Endgame/
```

---

Built with care and a dash of dread for Assembly.
