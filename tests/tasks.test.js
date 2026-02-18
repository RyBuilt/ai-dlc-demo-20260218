const request = require('supertest');
const express = require('express');
const { createDatabase } = require('../src/db');
const createTaskRouter = require('../src/routes/tasks');
const errorHandler = require('../src/middleware/errorHandler');

let app;
let db;

beforeEach(() => {
  db = createDatabase(':memory:');
  app = express();
  app.use(express.json());
  app.use('/api/tasks', createTaskRouter(db));
  app.use(errorHandler);
});

afterEach(() => {
  db.close();
});

describe('POST /api/tasks', () => {
  test('creates a task with title and description', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test task', description: 'A description' });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Test task');
    expect(res.body.description).toBe('A description');
    expect(res.body.completed).toBe(0);
    expect(res.body.id).toBeDefined();
    expect(res.body.created_at).toBeDefined();
    expect(res.body.updated_at).toBeDefined();
  });

  test('creates a task with title only', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Title only' });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Title only');
    expect(res.body.description).toBe('');
  });

  test('returns 400 when title is missing', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ description: 'No title' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Title is required');
  });

  test('returns 400 when title is empty string', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: '   ' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Title is required');
  });
});

describe('GET /api/tasks', () => {
  test('returns empty array when no tasks exist', async () => {
    const res = await request(app).get('/api/tasks');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('returns all tasks', async () => {
    await request(app).post('/api/tasks').send({ title: 'Task 1' });
    await request(app).post('/api/tasks').send({ title: 'Task 2' });

    const res = await request(app).get('/api/tasks');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });
});

describe('GET /api/tasks/:id', () => {
  test('returns a task by id', async () => {
    const created = await request(app)
      .post('/api/tasks')
      .send({ title: 'Find me' });

    const res = await request(app).get(`/api/tasks/${created.body.id}`);

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Find me');
  });

  test('returns 404 for non-existent task', async () => {
    const res = await request(app).get('/api/tasks/999');

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Task not found');
  });
});

describe('PUT /api/tasks/:id', () => {
  test('updates task title', async () => {
    const created = await request(app)
      .post('/api/tasks')
      .send({ title: 'Original' });

    const res = await request(app)
      .put(`/api/tasks/${created.body.id}`)
      .send({ title: 'Updated' });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated');
  });

  test('updates task completed status', async () => {
    const created = await request(app)
      .post('/api/tasks')
      .send({ title: 'Do this' });

    const res = await request(app)
      .put(`/api/tasks/${created.body.id}`)
      .send({ completed: true });

    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(1);
  });

  test('only updates provided fields', async () => {
    const created = await request(app)
      .post('/api/tasks')
      .send({ title: 'Original', description: 'Keep me' });

    const res = await request(app)
      .put(`/api/tasks/${created.body.id}`)
      .send({ title: 'Changed' });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Changed');
    expect(res.body.description).toBe('Keep me');
  });

  test('returns 404 for non-existent task', async () => {
    const res = await request(app)
      .put('/api/tasks/999')
      .send({ title: 'Nope' });

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Task not found');
  });

  test('returns 400 when no valid fields provided', async () => {
    const created = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test' });

    const res = await request(app)
      .put(`/api/tasks/${created.body.id}`)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('No valid fields provided');
  });
});

describe('DELETE /api/tasks/:id', () => {
  test('deletes a task', async () => {
    const created = await request(app)
      .post('/api/tasks')
      .send({ title: 'Delete me' });

    const res = await request(app).delete(`/api/tasks/${created.body.id}`);
    expect(res.status).toBe(204);

    const get = await request(app).get(`/api/tasks/${created.body.id}`);
    expect(get.status).toBe(404);
  });

  test('returns 404 for non-existent task', async () => {
    const res = await request(app).delete('/api/tasks/999');

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Task not found');
  });
});
