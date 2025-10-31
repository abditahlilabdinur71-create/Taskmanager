
import React, { useState, useMemo } from 'react';
import TaskItem from './TaskItem';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, newText: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.text.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [tasks, searchTerm]);

  return (
    <div className="w-full max-w-lg">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors duration-200 shadow-sm"
          aria-label="Search tasks"
        />
      </div>

      {filteredTasks.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg py-8">
          {searchTerm ? 'No tasks found for your search.' : 'No tasks yet. Add one above!'}
        </p>
      )}

      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
