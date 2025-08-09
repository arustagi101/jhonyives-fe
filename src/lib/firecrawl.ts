import FirecrawlApp from '@mendable/firecrawl-js';

let _firecrawl: FirecrawlApp | null = null;

export const firecrawl = new Proxy({} as FirecrawlApp, {
  get(_, prop) {
    if (!_firecrawl) {
      if (!process.env.FIRECRAWL_API_KEY) {
        throw new Error("FIRECRAWL_API_KEY environment variable is required");
      }
      _firecrawl = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });
    }
    return _firecrawl[prop as keyof typeof _firecrawl];
  }
});