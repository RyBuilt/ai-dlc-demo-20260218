import { useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError('Title is required');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await onAdd(trimmed, description.trim());
      setTitle('');
      setDescription('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100">
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-lg transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
            />
            {error && (
              <p className="mt-1.5 text-sm text-red-500">{error}</p>
            )}
          </div>
          <input
            type="text"
            placeholder="Add a description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-lg bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-600 hover:shadow-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Adding...' : 'Add Task'}
          </button>
        </div>
      </div>
    </form>
  );
}
