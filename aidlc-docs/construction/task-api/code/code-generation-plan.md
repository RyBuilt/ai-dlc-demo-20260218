# Code Generation Plan: Task Management API

## Overview

**Unit**: task-api (single unit — all FRs and NFRs)
**Scope**: Complete REST API with Express.js, SQLite, and CRUD endpoints
**Branch**: `fr-1/task-management-api`

---

## Files to Create

### Source Files

- [x] `package.json` - Project manifest with dependencies and scripts
- [x] `src/db.js` - SQLite database setup and initialization (NFR-1)
- [x] `src/routes/tasks.js` - Task CRUD route handlers (FR-1 through FR-5)
- [x] `src/middleware/errorHandler.js` - Centralized error handling middleware (NFR-2)
- [x] `src/app.js` - Express app setup, middleware, and route mounting
- [x] `src/server.js` - Server entry point (starts listening)

### Test Files

- [x] `tests/tasks.test.js` - Integration tests for all CRUD endpoints

---

## Dependencies to Add

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.21 | Web framework |
| better-sqlite3 | ^11 | SQLite driver (synchronous, fast) |
| jest | ^29 | Test framework |
| supertest | ^7 | HTTP assertion testing |

---

## Implementation Order

1. [x] Initialize project — `package.json` with dependencies and scripts
2. [x] Database layer — `src/db.js` with tasks table schema (NFR-1)
3. [x] Error handler middleware — `src/middleware/errorHandler.js` (NFR-2)
4. [x] Task routes — `src/routes/tasks.js` (FR-1 through FR-5)
5. [x] App setup — `src/app.js` wiring middleware and routes
6. [x] Server entry point — `src/server.js`
7. [x] Integration tests — `tests/tasks.test.js`

---

## Code Standards

- **Style**: Standard Node.js conventions (camelCase, no semicolons optional)
- **Naming**: RESTful resource naming (`/api/tasks`, `/api/tasks/:id`)
- **Error Handling**: Centralized via middleware, consistent JSON `{ error: "message" }` responses
- **Structure**: Modular — separate files for db, routes, middleware, app, server

---

## Database Schema

```sql
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  completed INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
```

---

## Testing Strategy

- **Integration Tests**: Test all 5 endpoints via supertest against the Express app
- **Test Database**: Use in-memory SQLite (`:memory:`) for isolated tests
- **Coverage**: All CRUD operations, error cases (404, 400), edge cases
