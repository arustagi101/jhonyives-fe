'use client';

import { useState, useRef } from 'react';
import { useScraping } from '@/hooks/useScraping';
import ResultsSection from './ResultsSection';

export default function LandingPageModernizer() {
  const [url, setUrl] = useState('');
  const [submittedUrl, setSubmittedUrl] = useState('');
  const resultsRef = useRef<HTMLDivElement>(null);
  const { scrapeUrl, loading, error, data } = useScraping();

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (url && !loading) {
      setSubmittedUrl(url);
      
      // Trigger the scraping
      await scrapeUrl(url);
      
      // Smooth scroll to results section
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      {/* Initial Full-Page View */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
              Your personal designer Jhony!
            </h1>
            <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16">
              Transform any website into a modern, beautiful design instantly
            </p>
            
            {/* URL Input Form */}
            <form onSubmit={handleUrlSubmit} className="relative max-w-2xl mx-auto">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL to modernize..."
                className="w-full px-8 py-8 text-xl rounded-3xl border-0 shadow-2xl focus:ring-4 focus:ring-blue-500/30 focus:outline-none transition-all duration-300 bg-white dark:bg-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className={`absolute right-4 top-4 px-10 py-4 text-white text-xl rounded-2xl font-semibold transition-all duration-300 shadow-xl ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
                }`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Scraping...
                  </span>
                ) : (
                  'Modernize ✨'
                )}
              </button>
            </form>
            
            {/* Error Display */}
            {error && (
              <div className="mt-6 max-w-2xl mx-auto p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-center">
                  ⚠️ {error}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      {submittedUrl && (
        <div ref={resultsRef}>
          <ResultsSection submittedUrl={submittedUrl} scrapedData={data} loading={loading} />
        </div>
      )}
    </>
  );
}