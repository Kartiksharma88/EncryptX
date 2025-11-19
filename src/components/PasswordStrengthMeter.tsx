import React from 'react';

interface PasswordStrengthMeterProps {
  strength: {
    score: number;
    feedback: string;
    color: string;
  };
}

export default function PasswordStrengthMeter({ strength }: PasswordStrengthMeterProps) {
  const getColorClass = (color: string) => {
    switch (color) {
      case 'red':
        return 'bg-red-500';
      case 'orange':
        return 'bg-orange-500';
      case 'yellow':
        return 'bg-yellow-500';
      case 'blue':
        return 'bg-blue-500';
      case 'green':
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getTextColorClass = (color: string) => {
    switch (color) {
      case 'red':
        return 'text-red-600 dark:text-red-400';
      case 'orange':
        return 'text-orange-600 dark:text-orange-400';
      case 'yellow':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'blue':
        return 'text-blue-600 dark:text-blue-400';
      case 'green':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Password Strength
        </span>
        <span className={`text-sm font-medium ${getTextColorClass(strength.color)}`}>
          {strength.feedback}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-300 ${getColorClass(strength.color)}`}
          style={{ width: `${strength.score}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Weak</span>
        <span>Strong</span>
      </div>
    </div>
  );
}