'use client';

import { useState } from 'react';

export default function LandingPageModernizer() {
  const [url, setUrl] = useState('');
  const [submittedUrl, setSubmittedUrl] = useState('');

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      setSubmittedUrl(url);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Your personal designer Jhony!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Transform any website into a modern, beautiful design instantly
          </p>
        </div>

        {/* URL Input */}
        <div className="max-w-4xl mx-auto mb-12">
          <form onSubmit={handleUrlSubmit} className="relative">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL to modernize..."
              className="w-full px-6 py-6 text-lg rounded-2xl border-0 shadow-lg focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 bg-white dark:bg-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              required
            />
            <button
              type="submit"
              className="absolute right-3 top-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Modernize
            </button>
          </form>
        </div>

        {/* Preview Section */}
        {submittedUrl && (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Original Website */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-700 px-6 py-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                    Original Website
                  </h3>
                </div>
                <div className="relative">
                  <iframe
                    src={submittedUrl}
                    className="w-full h-[600px] border-0"
                    title="Original Website"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Modernized Website */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-700 px-6 py-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                    Modernized by Jhony ✨
                  </h3>
                </div>
                <div className="relative">
                  <iframe
                    src={submittedUrl}
                    className="w-full h-[600px] border-0"
                    title="Modernized Website"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!submittedUrl && (
          <div className="max-w-4xl mx-auto text-center py-20">
            <div className="text-8xl mb-8">🎨</div>
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Ready to transform your website?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Enter a URL above to see the magic happen
            </p>
          </div>
        )}
      </div>
    </div>
  );
}