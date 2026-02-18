# Requirements: Task Manager Frontend

## Intent Analysis

| Attribute | Value |
|-----------|-------|
| **Request** | Build a React frontend UI for the task manager |
| **Request Type** | New Feature (frontend for existing API) |
| **Scope** | New Component (React SPA alongside existing backend) |
| **Complexity** | Simple-Moderate |
| **Depth** | Standard |

---

## Technical Decisions

| Decision | Value |
|----------|-------|
| **Framework** | React (via Vite) |
| **Styling** | Tailwind CSS |
| **UI Polish** | Polished & modern |
| **Backend** | Existing Express API at /api/tasks |
| **Architecture** | SPA served alongside Express backend (proxy in dev) |

---

## Functional Requirements

### FR-1: View Task List

Display all tasks from the API in a clean, organized list.

**API**: `GET /api/tasks`

**Acceptance Criteria**:
- Fetches and displays all tasks on page load
- Shows task title, description (if present), and completed status
- Shows "No tasks yet" message when list is empty
- Tasks ordered by most recently created first
- Visual distinction between completed and incomplete tasks

### FR-2: Create Task

Allow user to create a new task via a form.

**API**: `POST /api/tasks`

**Acceptance Criteria**:
- Form with title (required) and description (optional) fields
- Submit button creates the task via API
- New task appears in the list immediately after creation
- Form clears after successful submission
- Shows validation error if title is empty
- Loading state while submitting

### FR-3: Toggle Task Completion

Allow user to mark a task as complete or incomplete.

**API**: `PUT /api/tasks/:id`

**Acceptance Criteria**:
- Checkbox or toggle to mark task complete/incomplete
- Calls API to update completed status
- Visual feedback (strikethrough, muted colors) for completed tasks
- Optimistic UI update with rollback on error

### FR-4: Edit Task

Allow user to edit an existing task's title and description.

**API**: `PUT /api/tasks/:id`

**Acceptance Criteria**:
- Edit mode activated by clicking an edit button
- Inline editing of title and description
- Save and cancel buttons in edit mode
- Updates reflected immediately after save

### FR-5: Delete Task

Allow user to remove a task.

**API**: `DELETE /api/tasks/:id`

**Acceptance Criteria**:
- Delete button on each task
- Confirmation before deletion (to prevent accidents)
- Task removed from list immediately after deletion
- Error handling if deletion fails

---

## Non-Functional Requirements

### NFR-1: Responsive Design

UI should work well on desktop and mobile screens.

**Acceptance Criteria**:
- Clean layout on screens 375px to 1920px wide
- Touch-friendly targets on mobile

### NFR-2: API Proxy (Development)

Vite dev server should proxy API requests to the Express backend.

**Acceptance Criteria**:
- `/api/*` requests proxied to `http://localhost:3000` in development
- No CORS issues during development

### NFR-3: Production Build Integration

Frontend should be servable from the Express backend in production.

**Acceptance Criteria**:
- `npm run build` produces static files in a `client/dist` directory
- Express backend can serve the static files
- Single `npm start` command runs the full application

---

## Constraints

- Must connect to the existing Express API (no API changes)
- React SPA (single page, no routing needed)
- No authentication (matches backend)

---

## Assumptions

- Backend runs on port 3000
- Frontend dev server on port 5173 (Vite default)
- Production: Express serves both API and static frontend files
