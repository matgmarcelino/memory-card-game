# Champion Recall

A memory card game using League of Legends champions. Pick each champion exactly once. Pick one you've already chosen and the round is over.

Built with React and Vite. Champion data and art come from Riot's [Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon) CDN.

## How to play

- Every game draws 12 random champions.
- Each turn shows 5 of them, and at least one is always a champion you haven't picked yet.
- Click a champion you haven't picked to score a point. The cards reshuffle after every pick.
- Click a champion you already picked and the round ends. You keep the same 12 champions for the next round.
- Pick all 12 without repeating to complete a perfect round. Your best score is kept for the whole session.

## Getting started

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Scripts

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload      |
| `npm run build`   | Build for production into `dist/`         |
| `npm run preview` | Serve the production build locally        |
| `npm run lint`    | Lint with ESLint                          |
| `npm run check`   | Lint and format-check with Biome          |

## Project structure

```
src/
├── api/champions.js     # Fetches champions, runs the game rules (rotation, win/lose)
├── components/          # Header, Scoreboard, Board, Card, Notice, Toast, Footer
├── styles/              # One .css per component (incl. mobile breakpoints)
│   └── index.css        # Theme tokens, reset, page layout, shared .button
├── App.jsx              # Game state, score tracking, toasts
└── main.jsx
```

## Legal

Champion Recall isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
