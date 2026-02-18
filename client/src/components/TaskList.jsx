import TaskItem from './TaskItem.jsx';

export default function TaskList({ tasks, onToggle, onUpdate, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-gray-200 py-16 text-center">
        <p className="text-lg font-medium text-gray-400">No tasks yet</p>
        <p className="mt-1 text-sm text-gray-300">Add one above to get started</p>
      </div>
    );
  }

  const incomplete = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) => t.completed);

  return (
    <div className="space-y-3">
      {incomplete.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}

      {completed.length > 0 && incomplete.length > 0 && (
        <div className="flex items-center gap-3 px-1 pt-2">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs font-medium text-gray-400">
            Completed ({completed.length})
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
      )}

      {completed.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
