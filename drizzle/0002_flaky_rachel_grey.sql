ALTER TABLE "webpage_scrapes" ADD COLUMN "domain" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "webpage_scrapes" ADD COLUMN "repoId" varchar(255);--> statement-breakpoint
ALTER TABLE "webpage_scrapes" ADD COLUMN "devServerEphemeralUrl" varchar(512);--> statement-breakpoint
ALTER TABLE "webpage_scrapes" ADD COLUMN "devServerMcpUrl" varchar(512);--> statement-breakpoint
ALTER TABLE "webpage_scrapes" ADD COLUMN "devServerCodeUrl" varchar(512);--> statement-breakpoint
ALTER TABLE "webpage_scrapes" ADD COLUMN "devServerIsNew" boolean;