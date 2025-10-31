
import React from 'react';
import Logo from './Logo';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white z-50 animate-fade-in">
      <div className="scale-125 md:scale-150 transform transition-transform duration-500 ease-out">
        <Logo />
      </div>
      <p className="mt-4 text-xl md:text-2xl font-light tracking-wide animate-pulse">
        Get Things Done
      </p>
    </div>
  );
};

export default SplashScreen;
