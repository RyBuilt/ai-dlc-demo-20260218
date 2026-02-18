# Code Generation Plan: Task Manager Frontend

## Overview

**Unit**: frontend (single unit — React SPA)
**Scope**: Vite + React + Tailwind CSS app in `client/` directory, plus backend updates for static serving
**Branch**: `fr-1/react-frontend`

---

## Files to Create

### Client Source Files

- [x] `client/package.json` - Vite React project manifest
- [x] `client/vite.config.js` - Vite config with API proxy + Tailwind plugin
- [x] `client/index.html` - HTML entry point
- [x] `client/src/main.jsx` - React entry point
- [x] `client/src/App.jsx` - Main app component (state management, API calls)
- [x] `client/src/components/TaskForm.jsx` - Create task form
- [x] `client/src/components/TaskList.jsx` - Task list container
- [x] `client/src/components/TaskItem.jsx` - Individual task with toggle/edit/delete
- [x] `client/src/components/ConfirmDialog.jsx` - Delete confirmation modal
- [x] `client/src/api.js` - API client functions (fetch wrapper)
- [x] `client/src/index.css` - Tailwind directives

### Config Files

- [x] Tailwind v4 configured via @tailwindcss/vite plugin (no separate config needed)

### Files Modified

- [x] `src/app.js` - Added static file serving for production
- [x] `package.json` - Added `dev`, `build`, and `install:all` scripts
- [x] `.gitignore` - Added `client/dist/`

---

## Dependencies to Add

### Client Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19 | UI library |
| react-dom | ^19 | React DOM renderer |
| @vitejs/plugin-react | ^4 | Vite React plugin |
| vite | ^6 | Build tool & dev server |
| tailwindcss | ^4 | Utility-first CSS framework |
| @tailwindcss/vite | ^4 | Tailwind Vite plugin |

---

## Implementation Order

1. [x] Scaffold Vite React project in `client/`
2. [x] Configure Tailwind CSS
3. [x] Configure Vite proxy for API
4. [x] Create API client (`api.js`)
5. [x] Create ConfirmDialog component
6. [x] Create TaskForm component
7. [x] Create TaskItem component (with toggle, edit, delete)
8. [x] Create TaskList component
9. [x] Build App component (state, data fetching, orchestration)
10. [x] Style with Tailwind (polished, modern look)
11. [x] Update Express backend for static file serving
12. [x] Update root package.json with full-stack scripts

---

## Component Architecture

```
App.jsx
├── TaskForm.jsx          (create new tasks)
├── TaskList.jsx          (list container)
│   └── TaskItem.jsx      (individual task — toggle, edit, delete)
└── ConfirmDialog.jsx     (delete confirmation modal)
```

---

## Code Standards

- **Style**: Modern React with hooks (useState, useEffect, useCallback)
- **Components**: Functional components only
- **State**: Local state in App.jsx (no global state library needed)
- **API**: Async/await with fetch, centralized in api.js
- **Tailwind**: Utility classes inline, custom styles minimal
- **Polish**: Shadows, rounded corners, transitions, hover states, focus rings
