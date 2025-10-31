
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
      <svg
        className="w-8 h-8 md:w-10 md:h-10 text-indigo-500 dark:text-indigo-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        ></path>
      </svg>
      <span>TaskMate</span>
    </div>
  );
};

export default Logo;
