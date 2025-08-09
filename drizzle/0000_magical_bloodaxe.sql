CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "webpage_scrapes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "webpage_scrapes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"url" varchar(2048) NOT NULL,
	"markdownContent" text,
	"scrapedAt" timestamp DEFAULT now() NOT NULL,
	"freestyleSessionId" varchar(255),
	"title" varchar(500),
	"status" varchar(50) DEFAULT 'success',
	"errorMessage" text,
	"contentLength" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
