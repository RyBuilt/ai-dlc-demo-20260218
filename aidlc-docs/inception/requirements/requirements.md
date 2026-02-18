# Requirements: Task Management API

## Intent Analysis

| Attribute | Value |
|-----------|-------|
| **Request** | Build a REST API for task management |
| **Request Type** | New Project |
| **Scope** | Single Component |
| **Complexity** | Simple |
| **Depth** | Minimal |

---

## Technical Decisions

| Decision | Value |
|----------|-------|
| **Language** | Node.js |
| **Framework** | Express |
| **Database** | SQLite |
| **Authentication** | None |

---

## Functional Requirements

### FR-1: Create Task

Create a new task via POST request.

**Endpoint**: `POST /api/tasks`

**Input**:
- `title` (required, string): Task title
- `description` (optional, string): Task description

**Acceptance Criteria**:
- Accepts JSON body with title and optional description
- Returns 201 with the created task (including generated id, timestamps)
- Returns 400 if title is missing or empty

### FR-2: List Tasks

Retrieve all tasks via GET request.

**Endpoint**: `GET /api/tasks`

**Acceptance Criteria**:
- Returns 200 with an array of all tasks
- Returns empty array if no tasks exist
- Each task includes id, title, description, completed status, and timestamps

### FR-3: Get Task by ID

Retrieve a single task by its ID.

**Endpoint**: `GET /api/tasks/:id`

**Acceptance Criteria**:
- Returns 200 with the task object if found
- Returns 404 if task does not exist

### FR-4: Update Task

Update an existing task.

**Endpoint**: `PUT /api/tasks/:id`

**Input**:
- `title` (optional, string): Updated title
- `description` (optional, string): Updated description
- `completed` (optional, boolean): Completion status

**Acceptance Criteria**:
- Returns 200 with the updated task
- Returns 404 if task does not exist
- Returns 400 if no valid fields provided
- Only updates fields that are provided

### FR-5: Delete Task

Delete a task by its ID.

**Endpoint**: `DELETE /api/tasks/:id`

**Acceptance Criteria**:
- Returns 204 on successful deletion
- Returns 404 if task does not exist

---

## Non-Functional Requirements

### NFR-1: Data Persistence

Tasks must be persisted to a SQLite database file so data survives server restarts.

**Acceptance Criteria**:
- Database file created automatically on first run
- Tasks table with appropriate schema (id, title, description, completed, created_at, updated_at)
- Auto-incrementing integer primary key

### NFR-2: Error Handling

API should return consistent JSON error responses.

**Acceptance Criteria**:
- All errors return JSON with `error` field
- Appropriate HTTP status codes (400, 404, 500)

---

## Constraints

- No authentication required
- Single-user API
- No pagination needed (basic CRUD scope)

---

## Assumptions

- Tasks have a simple flat structure (no subtasks, no categories)
- The API will run locally for development/demo purposes
- SQLite is sufficient for the expected data volume

---

## Open Questions

None - all requirements clarified.
