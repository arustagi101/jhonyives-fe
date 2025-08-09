import { useState } from 'react';

interface ScrapeResult {
  id: number;
  url: string;
  title: string;
  contentLength: number;
  scrapedAt: string;
  markdownContent: string;
}

interface ScrapeResponse {
  success: boolean;
  data?: ScrapeResult;
  error?: string;
}

interface UseScraping {
  scrapeUrl: (url: string, freestyleSessionId?: string) => Promise<ScrapeResult | null>;
  loading: boolean;
  error: string | null;
  data: ScrapeResult | null;
}

export function useScraping(): UseScraping {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ScrapeResult | null>(null);

  const scrapeUrl = async (url: string, freestyleSessionId?: string): Promise<ScrapeResult | null> => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          freestyleSessionId,
        }),
      });

      const result: ScrapeResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to scrape URL');
      }

      if (result.success && result.data) {
        setData(result.data);
        return result.data;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    scrapeUrl,
    loading,
    error,
    data,
  };
}