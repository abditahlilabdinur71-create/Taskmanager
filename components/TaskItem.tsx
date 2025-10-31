
import React, { useState } from 'react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, newText: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEditSave = () => {
    if (editedText.trim() && editedText.trim() !== task.text) {
      onEditTask(task.id, editedText.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditSave();
    }
    if (e.key === 'Escape') {
      setEditedText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`
        flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-3
        transition-all duration-300 ease-in-out transform
        ${task.completed ? 'opacity-70 border-l-4 border-indigo-400 dark:border-indigo-600' : 'border-l-4 border-transparent hover:shadow-md'}
      `}
    >
      <div className="flex items-center flex-grow min-w-0">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-indigo-600 dark:checked:border-transparent cursor-pointer"
          aria-label={`Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onBlur={handleEditSave}
            onKeyDown={handleKeyDown}
            className="ml-3 flex-grow p-1 border-b-2 border-indigo-500 bg-transparent text-gray-900 dark:text-gray-50 focus:outline-none"
            autoFocus
          />
        ) : (
          <span
            className={`ml-3 text-lg break-words flex-grow ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-50'}`}
            onDoubleClick={() => setIsEditing(true)}
            title="Double click to edit"
          >
            {task.text}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-2 ml-4">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded transition-colors duration-200"
            aria-label={`Edit task "${task.text}"`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              ></path>
            </svg>
          </button>
        )}
        <button
          onClick={() => onDeleteTask(task.id)}
          className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 rounded transition-colors duration-200"
          aria-label={`Delete task "${task.text}"`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
