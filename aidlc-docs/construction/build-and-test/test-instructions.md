# Test Instructions

## Test Overview

| Test Type | Count | Location |
|-----------|-------|----------|
| Backend Integration Tests | 15 | `tests/tasks.test.js` |

---

## Running Tests

### All Tests

```bash
npm test
```

---

## Manual UI Testing Checklist

Start the app in dev mode (`npm run dev`) and verify:

### Create Task (FR-2)
- [ ] Enter title and click "Add Task" — task appears in list
- [ ] Submit with empty title — shows "Title is required" error
- [ ] Form clears after successful submission
- [ ] "Adding..." loading state shows during submission

### View Tasks (FR-1)
- [ ] Tasks display with title, description, and completed status
- [ ] Empty state shows "No tasks yet" message
- [ ] Tasks ordered by most recently created first

### Toggle Completion (FR-3)
- [ ] Click checkbox to mark complete — strikethrough + muted
- [ ] Click again to mark incomplete — restores normal style
- [ ] Completed tasks appear in separate section below

### Edit Task (FR-4)
- [ ] Hover task, click pencil icon — switches to edit mode
- [ ] Edit title/description, click Save — updates immediately
- [ ] Press Enter to save, Escape to cancel
- [ ] Cancel restores original values

### Delete Task (FR-5)
- [ ] Hover task, click trash icon — confirmation dialog appears
- [ ] Click Cancel — dialog closes, task remains
- [ ] Click Delete — task removed from list
- [ ] Press Escape to dismiss dialog

### Responsive (NFR-1)
- [ ] Layout works on desktop (1920px)
- [ ] Layout works on mobile (375px)

### Production Build (NFR-3)
- [ ] `npm run build` succeeds
- [ ] `npm start` serves frontend at localhost:3000
