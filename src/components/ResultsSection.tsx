'use client';

import { useState } from 'react';

interface ResultsSectionProps {
  submittedUrl: string;
}

export default function ResultsSection({ submittedUrl }: ResultsSectionProps) {
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
          <span className="text-gray-600 dark:text-gray-400 font-mono truncate max-w-xs">
            {submittedUrl}
          </span>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 rounded p-0.5">
          <button
            onClick={() => setViewMode('mobile')}
            className={`px-2 py-1 rounded text-xs ${
              viewMode === 'mobile'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            📱
          </button>
          <button
            onClick={() => setViewMode('desktop')}
            className={`px-2 py-1 rounded text-xs ${
              viewMode === 'desktop'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            🖥️
          </button>
        </div>
      </div>

      {/* Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
        {/* Original */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
          <div className="bg-gray-200 dark:bg-gray-700 px-3 py-1.5 text-xs text-gray-600 dark:text-gray-400">
            Original
          </div>
          {viewMode === 'mobile' ? (
            <div className="bg-gray-50 dark:bg-gray-900 flex justify-center p-4">
              <div className="w-72 h-[640px] bg-black rounded-2xl p-1">
                <div className="w-full h-full bg-white rounded-xl overflow-hidden relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-black rounded-b-lg z-10"></div>
                  <iframe
                    src={submittedUrl}
                    className="w-full h-full border-0 scale-50 origin-top-left"
                    title="Original Mobile"
                    loading="lazy"
                    style={{ width: '200%', height: '200%' }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <iframe
              src={submittedUrl}
              className="w-full h-[720px] border-0"
              title="Original Desktop"
              loading="lazy"
            />
          )}
        </div>

        {/* Modernized */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
          <div className="bg-gray-200 dark:bg-gray-700 px-3 py-1.5 text-xs text-gray-600 dark:text-gray-400">
            Modernized ✨
          </div>
          {viewMode === 'mobile' ? (
            <div className="bg-gray-50 dark:bg-gray-900 flex justify-center p-4">
              <div className="w-72 h-[640px] bg-black rounded-2xl p-1">
                <div className="w-full h-full bg-white rounded-xl overflow-hidden relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-black rounded-b-lg z-10"></div>
                  <iframe
                    src={submittedUrl}
                    className="w-full h-full border-0 scale-50 origin-top-left"
                    title="Modernized Mobile"
                    loading="lazy"
                    style={{ width: '200%', height: '200%' }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <iframe
              src={submittedUrl}
              className="w-full h-[720px] border-0"
              title="Modernized Desktop"
              loading="lazy"
            />
          )}
        </div>
      </div>
    </div>
  );
}