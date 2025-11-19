import React, { useCallback, useState } from 'react';
import { Upload, FileText } from 'lucide-react';

interface FileDropZoneProps {
  onFilesDrop: (files: File[]) => void;
  acceptedTypes?: string;
  description?: string;
}

export default function FileDropZone({ 
  onFilesDrop, 
  acceptedTypes,
  description = "Drop files here or click to browse" 
}: FileDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      onFilesDrop(droppedFiles);
    }
  }, [onFilesDrop]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      onFilesDrop(selectedFiles);
    }
    // Reset the input so the same file can be selected again
    e.target.value = '';
  }, [onFilesDrop]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
        isDragOver
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 transform scale-105'
          : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10'
      }`}
    >
      <input
        type="file"
        multiple
        accept={acceptedTypes}
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      
      <div className="flex flex-col items-center space-y-4">
        <div className={`p-4 rounded-full transition-colors ${
          isDragOver 
            ? 'bg-blue-100 dark:bg-blue-900/30' 
            : 'bg-gray-100 dark:bg-gray-600'
        }`}>
          {isDragOver ? (
            <Upload className="w-8 h-8 text-blue-500 animate-bounce" />
          ) : (
            <FileText className="w-8 h-8 text-gray-500 dark:text-gray-400" />
          )}
        </div>
        
        <div className="space-y-2">
          <p className={`text-lg font-medium transition-colors ${
            isDragOver 
              ? 'text-blue-600 dark:text-blue-400' 
              : 'text-gray-700 dark:text-gray-300'
          }`}>
            {description}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Supports all file types • Multiple files allowed
          </p>
        </div>
      </div>
    </div>
  );
}