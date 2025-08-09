'use client';

import { useState } from 'react';

interface ScrapeResult {
  id: number;
  url: string;
  domain: string;
  title: string;
  contentLength: number;
  scrapedAt: string;
  markdownContent: string;
  freestyleSessionId: string;
  repoId: string;
  devServerEphemeralUrl?: string;
  devServerMcpUrl?: string;
  devServerCodeUrl?: string;
  devServerIsNew?: boolean;
}

interface ResultsSectionProps {
  submittedUrl: string;
  scrapedData: ScrapeResult | null;
  loading: boolean;
}

export default function ResultsSection({ submittedUrl, scrapedData, loading }: ResultsSectionProps) {
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
      {/* Scraping Status */}
      {loading && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-blue-600 dark:text-blue-400">Scraping webpage content...</span>
          </div>
        </div>
      )}

      {/* Scraped Data Info */}
      {scrapedData && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-semibold text-green-700 dark:text-green-400">Title:</span>
              <p className="text-green-600 dark:text-green-300 truncate">{scrapedData.title || 'N/A'}</p>
            </div>
            <div>
              <span className="font-semibold text-green-700 dark:text-green-400">Content:</span>
              <p className="text-green-600 dark:text-green-300">{scrapedData.contentLength?.toLocaleString()} chars</p>
            </div>
            <div>
              <span className="font-semibold text-green-700 dark:text-green-400">Domain:</span>
              <p className="text-green-600 dark:text-green-300 truncate">{scrapedData.domain}</p>
            </div>
            <div>
              <span className="font-semibold text-green-700 dark:text-green-400">Dev Server:</span>
              <p className="text-green-600 dark:text-green-300">
                {scrapedData.devServerEphemeralUrl ? '🟢 Live' : '🟡 Setting up...'}
              </p>
            </div>
          </div>
          {scrapedData.devServerCodeUrl && (
            <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-700">
              <div className="flex gap-2 flex-wrap">
                <a
                  href={scrapedData.devServerCodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-full transition-colors"
                >
                  🔧 VS Code Editor
                </a>
                {scrapedData.devServerEphemeralUrl && (
                  <a
                    href={scrapedData.devServerEphemeralUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded-full transition-colors"
                  >
                    🚀 Live Preview
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      )}
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
          <div className="bg-gray-200 dark:bg-gray-700 px-3 py-1.5 text-xs text-gray-600 dark:text-gray-400 flex items-center justify-between">
            <span>Modernized ✨</span>
            {scrapedData?.devServerEphemeralUrl && (
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-600 dark:text-green-400">Live Server</span>
              </div>
            )}
          </div>
          {scrapedData?.devServerEphemeralUrl ? (
            viewMode === 'mobile' ? (
              <div className="bg-gray-50 dark:bg-gray-900 flex justify-center p-4">
                <div className="w-72 h-[640px] bg-black rounded-2xl p-1">
                  <div className="w-full h-full bg-white rounded-xl overflow-hidden relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-black rounded-b-lg z-10"></div>
                    <iframe
                      src={scrapedData.devServerEphemeralUrl}
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
                src={scrapedData.devServerEphemeralUrl}
                className="w-full h-[720px] border-0"
                title="Modernized Desktop"
                loading="lazy"
              />
            )
          ) : (
            <div className="w-full h-[720px] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
              <div className="text-center p-8">
                <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400">Setting up development server...</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">This may take a few moments</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}