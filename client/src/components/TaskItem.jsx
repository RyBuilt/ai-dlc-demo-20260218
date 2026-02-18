import { useState } from 'react';

export default function TaskItem({ task, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    const trimmed = editTitle.trim();
    if (!trimmed) return;

    setSaving(true);
    try {
      await onUpdate(task.id, { title: trimmed, description: editDescription.trim() });
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') handleCancel();
  }

  return (
    <div
      className={`group rounded-xl bg-white p-4 shadow-sm ring-1 transition-all hover:shadow-md ${
        task.completed
          ? 'ring-gray-100 opacity-60'
          : 'ring-gray-200'
      }`}
    >
      {editing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
          />
          <input
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Description (optional)"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving || !editTitle.trim()}
              className="cursor-pointer rounded-lg bg-indigo-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              className="cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium text-gray-500 transition hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <button
            onClick={() => onToggle(task.id, !task.completed)}
            className={`mt-0.5 flex h-5 w-5 flex-shrink-0 cursor-pointer items-center justify-center rounded-md border-2 transition ${
              task.completed
                ? 'border-indigo-500 bg-indigo-500 text-white'
                : 'border-gray-300 hover:border-indigo-400'
            }`}
            aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
          >
            {task.completed && (
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          <div className="min-w-0 flex-1">
            <p
              className={`text-sm font-medium transition ${
                task.completed ? 'text-gray-400 line-through' : 'text-gray-800'
              }`}
            >
              {task.title}
            </p>
            {task.description && (
              <p
                className={`mt-0.5 text-xs transition ${
                  task.completed ? 'text-gray-300 line-through' : 'text-gray-500'
                }`}
              >
                {task.description}
              </p>
            )}
          </div>

          <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
            <button
              onClick={() => setEditing(true)}
              className="cursor-pointer rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              aria-label="Edit task"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(task)}
              className="cursor-pointer rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
              aria-label="Delete task"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
