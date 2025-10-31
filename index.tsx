
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SplashScreen from './components/SplashScreen';
import { SPLASH_SCREEN_DURATION } from './constants';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const RootComponent: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, SPLASH_SCREEN_DURATION);

    return () => clearTimeout(timer);
  }, []);

  return (
    <React.StrictMode>
      {showSplash ? <SplashScreen /> : <App />}
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(rootElement);
root.render(<RootComponent />);
