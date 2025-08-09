import { NextRequest, NextResponse } from "next/server";
import { ScrapeResponse } from "@mendable/firecrawl-js";
import { db } from "@/db";
import { webpageScrapesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { firecrawl } from "@/lib/firecrawl";
import { freestyle } from "@/lib/freestyle";

export async function POST(request: NextRequest) {
  try {
    const { url, freestyleSessionId } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const domain = new URL(url).hostname.replace("www.", "");

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
          domain: record.domain,
          title: record.title,
          contentLength: record.contentLength,
          scrapedAt: record.scrapedAt,
          markdownContent: record.markdownContent,
          freestyleSessionId: record.freestyleSessionId,
          repoId: record.repoId,
          devServerEphemeralUrl: record.devServerEphemeralUrl,
          devServerMcpUrl: record.devServerMcpUrl,
          devServerCodeUrl: record.devServerCodeUrl,
          devServerIsNew: record.devServerIsNew,
        },
      });
    }

    // Check if repository already exists for this domain
    const existingDomainRecord = await db
      .select()
      .from(webpageScrapesTable)
      .where(eq(webpageScrapesTable.domain, domain))
      .limit(1);

    let repoId: string | undefined;
    let sessionId = freestyleSessionId;
    let devServerEphemeralUrl: string | undefined;
    let devServerMcpUrl: string | undefined;
    let devServerCodeUrl: string | undefined;
    let devServerIsNew: boolean | undefined;

    // If domain exists, reuse the repo, session, and dev server
    if (existingDomainRecord.length > 0) {
      repoId = existingDomainRecord[0].repoId || undefined;
      sessionId = existingDomainRecord[0].freestyleSessionId || freestyleSessionId;
      devServerEphemeralUrl = existingDomainRecord[0].devServerEphemeralUrl || undefined;
      devServerMcpUrl = existingDomainRecord[0].devServerMcpUrl || undefined;
      devServerCodeUrl = existingDomainRecord[0].devServerCodeUrl || undefined;
      devServerIsNew = existingDomainRecord[0].devServerIsNew || undefined;
    } else {
      // Create new git repository for new domain
      try {
        const repoName = domain.replace(/\./g, "-");
        const repoResponse = await freestyle.createGitRepository({
          name: repoName,
          source: {
            type: "git",
            url: "https://github.com/arustagi101/sample-nextjs",
            branch: "main",
            depth: 0,
          },
        });
        repoId = repoResponse.repoId;
        console.log(`Created new repo for domain ${domain}: ${repoId}`);

        // Create dev server for the repository
        const devServerResponse = await freestyle.requestDevServer({
          repoId: repoId,
        });

        devServerEphemeralUrl = devServerResponse.ephemeralUrl;
        devServerMcpUrl = devServerResponse.mcpEphemeralUrl;
        devServerCodeUrl = devServerResponse.codeServerUrl;
        devServerIsNew = devServerResponse.isNew;

        console.log(`Created dev server for domain ${domain}: ${devServerEphemeralUrl}`);
      } catch (error) {
        console.error("Failed to create git repository or dev server:", error);
      }
    }

    // Scrape the URL
    const scrapeResult = (await firecrawl.scrapeUrl(url, {
      formats: ["markdown"],
    })) as ScrapeResponse;

    if (!scrapeResult.success) {
      await db.insert(webpageScrapesTable).values({
        url,
        domain,
        freestyleSessionId: sessionId,
        repoId,
        devServerEphemeralUrl,
        devServerMcpUrl,
        devServerCodeUrl,
        devServerIsNew,
        status: "error",
        errorMessage: scrapeResult.error || "Unknown scraping error",
        scrapedAt: new Date(),
      });

      return NextResponse.json(
        { error: `Failed to scrape: ${scrapeResult.error}` },
        { status: 500 }
      );
    }

    const markdownContent = scrapeResult.markdown || "";
    const title = scrapeResult.metadata?.title || "";
    const contentLength = markdownContent.length;

    const record = await db
      .insert(webpageScrapesTable)
      .values({
        url,
        domain,
        markdownContent,
        freestyleSessionId: sessionId,
        title,
        status: "success",
        contentLength,
        repoId,
        devServerEphemeralUrl,
        devServerMcpUrl,
        devServerCodeUrl,
        devServerIsNew,
        scrapedAt: new Date(),
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: {
        id: record[0].id,
        url: record[0].url,
        domain: record[0].domain,
        title: record[0].title,
        contentLength: record[0].contentLength,
        scrapedAt: record[0].scrapedAt,
        markdownContent: record[0].markdownContent,
        freestyleSessionId: record[0].freestyleSessionId,
        repoId: record[0].repoId,
        devServerEphemeralUrl: record[0].devServerEphemeralUrl,
        devServerMcpUrl: record[0].devServerMcpUrl,
        devServerCodeUrl: record[0].devServerCodeUrl,
        devServerIsNew: record[0].devServerIsNew,
      },
    });
  } catch (error) {
    console.error("Scraping API error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}