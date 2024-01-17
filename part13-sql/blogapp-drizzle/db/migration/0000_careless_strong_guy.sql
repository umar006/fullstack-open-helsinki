CREATE TABLE IF NOT EXISTS "blog" (
	"id" serial PRIMARY KEY NOT NULL,
	"author" text,
	"url" text NOT NULL,
	"title" text NOT NULL,
	"likes" integer DEFAULT 0
);
