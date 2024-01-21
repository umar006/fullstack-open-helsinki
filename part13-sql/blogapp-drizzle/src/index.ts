import { eq } from "drizzle-orm";
import fastify from "fastify";
import db from "../db/index.js";
import { blog } from "./schema/blogs.js";

const server = fastify();

server.get("/api/blogs", async (req, reply) => {
  try {
    const blogs = await db.select().from(blog);

    return blogs;
  } catch (e) {
    console.error(e);
  }
});

server.get<{ Params: Pick<typeof blog.$inferSelect, "id"> }>(
  "/api/blogs/:id",
  async (req, reply) => {
    const blogId = req.params.id;

    try {
      const b = await db.select().from(blog).where(eq(blog.id, blogId));
      return b[0];
    } catch (e) {
      console.error(e);
    }
  },
);

server.delete<{ Params: Pick<typeof blog.$inferSelect, "id"> }>(
  "/api/blogs/:id",
  async (req, reply) => {
    const blogId = req.params.id;

    try {
      const b = await db
        .delete(blog)
        .where(eq(blog.id, blogId))
        .returning({ deletedId: blog.id });
      return b[0];
    } catch (e) {
      console.error(e);
    }
  },
);

server.listen({ port: 3001 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
