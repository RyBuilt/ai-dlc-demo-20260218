# Build Instructions

## Prerequisites

- Node.js version 18+ (LTS recommended)
- npm (included with Node.js)

---

## Environment Setup

### Install All Dependencies

```bash
npm run install:all
```

This installs both backend and frontend (client/) dependencies.

### Environment Variables

Optional — defaults are provided:

```bash
export PORT=3000  # Server port (default: 3000)
```

---

## Development Mode

Run backend and frontend dev servers simultaneously:

```bash
npm run dev
```

- Backend API: http://localhost:3000
- Frontend (Vite): http://localhost:5173 (auto-proxies /api to backend)

Open http://localhost:5173 in your browser.

---

## Production Mode

### 1. Build the frontend

```bash
npm run build
```

### 2. Start the server

```bash
npm start
```

Open http://localhost:3000 — Express serves both the API and the React app.

---

## Verification

- [ ] `npm run install:all` completes without errors
- [ ] `npm run dev` starts both servers
- [ ] Frontend loads at http://localhost:5173
- [ ] Can create, view, edit, toggle, and delete tasks
- [ ] `npm run build` produces `client/dist/` with index.html, JS, and CSS
- [ ] `npm start` serves the built frontend at http://localhost:3000

---

## Troubleshooting

### "Cannot find module 'better-sqlite3'"

**Solution**: `npm rebuild better-sqlite3` or delete `node_modules` and `npm install`

### Port Already in Use

**Solution**: `PORT=3001 npm start` or stop the conflicting process

### Vite proxy not working

**Symptom**: API calls fail with CORS errors in dev
**Solution**: Ensure backend is running on port 3000 before starting Vite dev server
