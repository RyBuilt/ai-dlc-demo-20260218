const express = require('express');

function createTaskRouter(db) {
  const router = express.Router();

  // FR-2: List all tasks
  router.get('/', (req, res) => {
    const tasks = db.prepare('SELECT * FROM tasks ORDER BY created_at DESC').all();
    res.json(tasks);
  });

  // FR-3: Get task by ID
  router.get('/:id', (req, res, next) => {
    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
    if (!task) {
      const err = new Error('Task not found');
      err.status = 404;
      return next(err);
    }
    res.json(task);
  });

  // FR-1: Create task
  router.post('/', (req, res, next) => {
    const { title, description } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      const err = new Error('Title is required');
      err.status = 400;
      return next(err);
    }

    const result = db.prepare(
      'INSERT INTO tasks (title, description) VALUES (?, ?)'
    ).run(title.trim(), description || '');

    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(task);
  });

  // FR-4: Update task
  router.put('/:id', (req, res, next) => {
    const existing = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
    if (!existing) {
      const err = new Error('Task not found');
      err.status = 404;
      return next(err);
    }

    const { title, description, completed } = req.body;

    if (title === undefined && description === undefined && completed === undefined) {
      const err = new Error('No valid fields provided');
      err.status = 400;
      return next(err);
    }

    const updatedTitle = title !== undefined ? title.trim() : existing.title;
    const updatedDescription = description !== undefined ? description : existing.description;
    const updatedCompleted = completed !== undefined ? (completed ? 1 : 0) : existing.completed;

    db.prepare(
      `UPDATE tasks SET title = ?, description = ?, completed = ?, updated_at = datetime('now') WHERE id = ?`
    ).run(updatedTitle, updatedDescription, updatedCompleted, req.params.id);

    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
    res.json(task);
  });

  // FR-5: Delete task
  router.delete('/:id', (req, res, next) => {
    const existing = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
    if (!existing) {
      const err = new Error('Task not found');
      err.status = 404;
      return next(err);
    }

    db.prepare('DELETE FROM tasks WHERE id = ?').run(req.params.id);
    res.status(204).send();
  });

  return router;
}

module.exports = createTaskRouter;
