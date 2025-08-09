'use client';

import { useState, useRef } from 'react';
import ResultsSection from './ResultsSection';

export default function LandingPageModernizer() {
  const [url, setUrl] = useState('');
  const [submittedUrl, setSubmittedUrl] = useState('');
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      setSubmittedUrl(url);
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
                className="absolute right-4 top-4 px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Modernize ✨
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {submittedUrl && (
        <div ref={resultsRef}>
          <ResultsSection submittedUrl={submittedUrl} />
        </div>
      )}
    </>
  );
}