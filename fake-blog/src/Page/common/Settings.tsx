// SettingsModal.tsx

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

const SettingsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [theme, setTheme] = useState<Theme>(
    () => (document.documentElement.getAttribute('data-theme') as Theme) || 'light'
  );

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('app-theme', newTheme);
    setTheme(newTheme);
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-xl w-80 mx-auto">
        <p className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Settings</p>

        <div className="space-y-4">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-between w-full p-3 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="text-gray-800 dark:text-white">
              {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            </span>
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-gray-600" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-300" />
            )}
          </button>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SettingsModal;