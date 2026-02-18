# Test Instructions

## Test Overview

| Test Type | Count | Location |
|-----------|-------|----------|
| Integration Tests | 15 | `tests/tasks.test.js` |

---

## Running Tests

### All Tests

```bash
npm test
```

### Specific Test File

```bash
npx jest tests/tasks.test.js --verbose
```

### Run a Single Test by Name

```bash
npx jest --testNamePattern="creates a task with title"
```

---

## Test Coverage

```bash
npx jest --coverage
```

---

## Test Data

### Setup

Tests use in-memory SQLite databases (`:memory:`). Each test gets a fresh database via `beforeEach`, so no external setup is needed.

### Cleanup

Databases are closed in `afterEach`. No manual cleanup required.

---

## Test Matrix

| Endpoint | Test | Expected |
|----------|------|----------|
| POST /api/tasks | Title + description | 201, task object |
| POST /api/tasks | Title only | 201, empty description |
| POST /api/tasks | Missing title | 400, error message |
| POST /api/tasks | Empty title | 400, error message |
| GET /api/tasks | No tasks | 200, empty array |
| GET /api/tasks | With tasks | 200, array of tasks |
| GET /api/tasks/:id | Valid ID | 200, task object |
| GET /api/tasks/:id | Invalid ID | 404, error message |
| PUT /api/tasks/:id | Update title | 200, updated task |
| PUT /api/tasks/:id | Update completed | 200, updated task |
| PUT /api/tasks/:id | Partial update | 200, only changed fields |
| PUT /api/tasks/:id | Invalid ID | 404, error message |
| PUT /api/tasks/:id | No fields | 400, error message |
| DELETE /api/tasks/:id | Valid ID | 204, no content |
| DELETE /api/tasks/:id | Invalid ID | 404, error message |
