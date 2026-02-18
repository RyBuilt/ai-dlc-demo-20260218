import { useEffect, useRef } from 'react';

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  const cancelRef = useRef(null);

  useEffect(() => {
    cancelRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onCancel();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
      <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <p className="text-gray-800 text-lg font-medium">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            ref={cancelRef}
            onClick={onCancel}
            className="cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
