import React, { useState, useEffect } from 'react';
import { Shield, FileText, Key, Activity, Moon, Sun } from 'lucide-react';
import EncryptionTab from './components/EncryptionTab';
import DecryptionTab from './components/DecryptionTab';
import KeyManagementTab from './components/KeyManagementTab';
import LogsTab from './components/LogsTab';
import { LogEntry } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('encrypt');
  const [darkMode, setDarkMode] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const addLog = (entry: Omit<LogEntry, 'id' | 'timestamp'>) => {
    const newLog: LogEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const tabs = [
    { id: 'encrypt', label: 'Encrypt Files', icon: Shield },
    { id: 'decrypt', label: 'Decrypt Files', icon: FileText },
    { id: 'keys', label: 'Key Management', icon: Key },
    { id: 'logs', label: 'Logs & Settings', icon: Activity },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EncryptX
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Advanced File Encryption & Security Suite
              </p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </header>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 mb-8 p-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 rounded-xl font-medium transition-all duration-300 flex-1 justify-center ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Tab Content */}
        <main className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {activeTab === 'encrypt' && <EncryptionTab onLog={addLog} />}
          {activeTab === 'decrypt' && <DecryptionTab onLog={addLog} />}
          {activeTab === 'keys' && <KeyManagementTab onLog={addLog} />}
          {activeTab === 'logs' && <LogsTab logs={logs} onClearLogs={() => setLogs([])} />}
        </main>
      </div>
    </div>
  );
}

export default App;