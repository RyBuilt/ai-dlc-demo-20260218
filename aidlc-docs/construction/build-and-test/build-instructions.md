# Build Instructions

## Prerequisites

- Node.js version 18+ (LTS recommended)
- npm (included with Node.js)

---

## Environment Setup

### Environment Variables

Optional — defaults are provided:

```bash
export PORT=3000  # Server port (default: 3000)
```

### Dependencies

```bash
npm install
```

**Expected Output**: `added XXX packages` with no errors.

---

## Build Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
npm start
```

**Expected Output**:
```
Task Management API running on http://localhost:3000
```

---

## Configuration

No configuration files are required. The SQLite database (`tasks.db`) is auto-created in the project root on first run.

---

## Verification

After starting the server, verify it's working:

```bash
# Create a task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "My first task", "description": "Testing the API"}'

# List all tasks
curl http://localhost:3000/api/tasks
```

- [ ] Server starts without errors
- [ ] POST /api/tasks returns 201 with created task
- [ ] GET /api/tasks returns array of tasks
- [ ] Database file `tasks.db` is created in project root

---

## Troubleshooting

### "Cannot find module 'better-sqlite3'"

**Symptom**: Error on startup about missing module
**Cause**: Native dependencies not compiled for your platform
**Solution**: `npm rebuild better-sqlite3` or delete `node_modules` and run `npm install`

### Port Already in Use

**Symptom**: `EADDRINUSE: address already in use :::3000`
**Cause**: Another process is using port 3000
**Solution**: `PORT=3001 npm start` or stop the other process
