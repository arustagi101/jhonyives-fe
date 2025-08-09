import { NextRequest, NextResponse } from 'next/server';
import { ScrapeResponse } from '@mendable/firecrawl-js';
import { db } from '@/db';
import { webpageScrapesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { firecrawl } from '@/lib/firecrawl';

export async function POST(request: NextRequest) {
  try {
    const { url, freestyleSessionId } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Check if URL already exists in database
    const existingRecord = await db
      .select()
      .from(webpageScrapesTable)
      .where(eq(webpageScrapesTable.url, url))
      .limit(1);

    if (existingRecord.length > 0) {
      const record = existingRecord[0];
      return NextResponse.json({
        success: true,
        data: {
          id: record.id,
          url: record.url,
          title: record.title,
          contentLength: record.contentLength,
          scrapedAt: record.scrapedAt,
          markdownContent: record.markdownContent,
          freestyleSessionId: record.freestyleSessionId,
        }
      });
    }

    const scrapeResult = await firecrawl.scrapeUrl(url, { 
      formats: ['markdown'] 
    }) as ScrapeResponse;

    if (!scrapeResult.success) {
      await db.insert(webpageScrapesTable).values({
        url,
        freestyleSessionId,
        status: 'error',
        errorMessage: scrapeResult.error || 'Unknown scraping error',
        scrapedAt: new Date(),
      });

      return NextResponse.json(
        { error: `Failed to scrape: ${scrapeResult.error}` },
        { status: 500 }
      );
    }

    const markdownContent = scrapeResult.markdown || '';
    const title = scrapeResult.metadata?.title || '';
    const contentLength = markdownContent.length;

    const record = await db.insert(webpageScrapesTable).values({
      url,
      markdownContent,
      freestyleSessionId,
      title,
      status: 'success',
      contentLength,
      scrapedAt: new Date(),
    }).returning();

    return NextResponse.json({
      success: true,
      data: {
        id: record[0].id,
        url: record[0].url,
        title: record[0].title,
        contentLength: record[0].contentLength,
        scrapedAt: record[0].scrapedAt,
        markdownContent: record[0].markdownContent,
      }
    });

  } catch (error) {
    console.error('Scraping API error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}