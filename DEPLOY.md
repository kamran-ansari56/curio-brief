# Deploy Curio Brief to Vercel (Free — Permanent URL)

## One-time setup (~10 minutes)

### Step 1 — GitHub Account
Go to github.com → Sign up (free) if you don't have one.

### Step 2 — Create a new repo
- Click the **+** button top right → **New repository**
- Name it: `curio-brief`
- Set to **Public**
- Click **Create repository**

### Step 3 — Upload the project files
GitHub will show you a page with upload options. Click **"uploading an existing file"**.

Drag and drop the entire `curio-brief` folder contents:
- `src/` folder
- `public/` folder
- `package.json`
- `vite.config.js`
- `index.html`
- `.gitignore`
- `README.md`

Click **Commit changes**.

### Step 4 — Connect to Vercel
- Go to **vercel.com** → Sign up with your GitHub account (free)
- Click **Add New Project**
- Select your `curio-brief` repository
- Vercel auto-detects it as a Vite project
- Click **Deploy**

That's it. In ~60 seconds you get a URL like:
`https://curio-brief-yourname.vercel.app`

This URL works on **any device, anywhere, forever** (as long as Vercel free tier exists).

---

## Adding a new daily brief (30 seconds)

Every time Claude generates a new day:

1. Download the new `.js` file Claude gives you
2. Go to your GitHub repo → `src/data/` folder
3. Click **Add file** → **Upload files** → drop the new file
4. Go to `src/App.jsx` in GitHub → click the pencil (edit) icon
5. Add the import and ALL_BRIEFS entry (Claude will give you the exact 2 lines)
6. Click **Commit changes**
7. Vercel auto-deploys → URL updates in ~30 seconds ✅

---

## Your permanent URL
(Fill this in after deploy)
`https://______________________.vercel.app`
