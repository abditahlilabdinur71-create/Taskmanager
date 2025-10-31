
import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import ThemeToggle from './components/ThemeToggle';
import Logo from './components/Logo';
import { Task, Theme } from './types';
import { LOCAL_STORAGE_KEY, LOCAL_STORAGE_THEME_KEY } from './constants';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [theme, setTheme] = useState<Theme>('light');

  // Load tasks and theme from local storage on initial mount
  useEffect(() => {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    if (savedTheme === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Save theme to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const addTask = useCallback((text: string) => {
    const newTask: Task = { id: uuidv4(), text, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  const editTask = useCallback((id: string, newText: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task,
      ),
    );
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 transition-colors duration-300">
      <header className="w-full max-w-lg flex justify-between items-center mb-8 pt-4">
        <Logo />
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>

      <main className="flex flex-col items-center w-full max-w-lg flex-grow">
        <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-6 drop-shadow-md">
          Your Tasks
        </h1>
        <AddTaskForm onAddTask={addTask} />
        <TaskList
          tasks={tasks}
          onToggleComplete={toggleComplete}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
        />
      </main>

      <footer className="w-full max-w-lg text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} TaskMate. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
