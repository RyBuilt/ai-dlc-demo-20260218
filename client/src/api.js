const BASE_URL = '/api/tasks';

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }

  if (res.status === 204) return null;
  return res.json();
}

export function fetchTasks() {
  return request(BASE_URL);
}

export function createTask(title, description) {
  return request(BASE_URL, {
    method: 'POST',
    body: JSON.stringify({ title, description }),
  });
}

export function updateTask(id, fields) {
  return request(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(fields),
  });
}

export function deleteTask(id) {
  return request(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
}
