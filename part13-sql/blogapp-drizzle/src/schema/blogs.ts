import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const blog = pgTable("blog", {
  id: serial("id").primaryKey(),
  author: text("author"),
  url: text("url").notNull(),
  title: text("title").notNull(),
  likes: integer("likes").default(0),
});
