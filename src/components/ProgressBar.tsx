import React from 'react';

interface ProgressBarProps {
  progress: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
}

export default function ProgressBar({ progress, status }: ProgressBarProps) {
  const getBarColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'processing':
        return 'bg-blue-500';
      default:
        return 'bg-gray-300 dark:bg-gray-600';
    }
  };

  const getBackgroundColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/20';
      case 'error':
        return 'bg-red-100 dark:bg-red-900/20';
      case 'processing':
        return 'bg-blue-100 dark:bg-blue-900/20';
      default:
        return 'bg-gray-100 dark:bg-gray-700';
    }
  };

  return (
    <div className={`w-full rounded-full h-2 ${getBackgroundColor()}`}>
      <div
        className={`h-2 rounded-full transition-all duration-300 ${getBarColor()} ${
          status === 'processing' ? 'animate-pulse' : ''
        }`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}