
import React, { useState } from 'react';

interface AddTaskFormProps {
  onAddTask: (text: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText.trim());
      setTaskText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6 w-full max-w-lg">
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-grow p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors duration-200 shadow-sm"
      />
      <button
        type="submit"
        className="px-5 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!taskText.trim()}
      >
        Add
      </button>
    </form>
  );
};

export default AddTaskForm;
