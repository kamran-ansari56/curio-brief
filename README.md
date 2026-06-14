# 🌌 Curio Brief

Your daily curiosity-first intelligence brief. Simple language, quizzes, mnemonics, real news.

## Adding a New Daily Brief

1. Get the new date file from Claude (e.g. `2026-06-03.js`)
2. Drop it into `src/data/`
3. Open `src/App.jsx`
4. Add two lines:
   ```js
   import d0603 from './data/2026-06-03.js'
   // inside ALL_BRIEFS:
   '2026-06-03': d0603,
   ```
5. `git add . && git commit -m "Add June 3 brief" && git push`
6. Vercel auto-deploys in ~30 seconds ✅

## Local Dev

```bash
npm install
npm run dev
```

## Deploy to Vercel

See DEPLOY.md
