import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from './api.js';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import ConfirmDialog from './components/ConfirmDialog.jsx';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadTasks = useCallback(async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
      setError('');
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  async function handleAdd(title, description) {
    const task = await createTask(title, description);
    setTasks((prev) => [task, ...prev]);
  }

  async function handleToggle(id, completed) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: completed ? 1 : 0 } : t))
    );
    try {
      await updateTask(id, { completed });
    } catch {
      loadTasks();
    }
  }

  async function handleUpdate(id, fields) {
    await updateTask(id, fields);
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...fields } : t))
    );
  }

  async function handleDeleteConfirm() {
    if (!deleteTarget) return;
    try {
      await deleteTask(deleteTarget.id);
      setTasks((prev) => prev.filter((t) => t.id !== deleteTarget.id));
    } catch {
      setError('Failed to delete task');
    } finally {
      setDeleteTarget(null);
    }
  }

  const taskCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="mx-auto max-w-xl px-4 py-12">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Task Manager
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {loading
              ? 'Loading...'
              : taskCount === 0
                ? 'All caught up!'
                : `${taskCount} task${taskCount === 1 ? '' : 's'} remaining`}
          </p>
        </header>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 ring-1 ring-red-200">
            {error}
          </div>
        )}

        <TaskForm onAdd={handleAdd} />

        {!loading && (
          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onUpdate={handleUpdate}
            onDelete={setDeleteTarget}
          />
        )}

        {deleteTarget && (
          <ConfirmDialog
            message={`Delete "${deleteTarget.title}"?`}
            onConfirm={handleDeleteConfirm}
            onCancel={() => setDeleteTarget(null)}
          />
        )}
      </div>
    </div>
  );
}
