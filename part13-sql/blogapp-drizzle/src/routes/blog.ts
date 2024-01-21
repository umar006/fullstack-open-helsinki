import { eq } from "drizzle-orm";
import { FastifyPluginCallback } from "fastify";
import db from "../../db/index.js";
import { blog } from "../schema/blogs.js";

const blogRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.get("/", async (req, reply) => {
    try {
      const blogs = await db.select().from(blog);

      return blogs;
    } catch (e) {
      console.error(e);
    }
  });

  fastify.get<{ Params: Pick<typeof blog.$inferSelect, "id"> }>(
    "/:id",
    async (req, reply) => {
      const blogId = req.params.id;

      try {
        const b = await db.select().from(blog).where(eq(blog.id, blogId));
        if (b.length === 0) {
          await reply.code(404).send({ error: "Blog not found" });
        }

        return b[0];
      } catch (e) {
        console.error(e);
      }
    },
  );

  fastify.delete<{ Params: Pick<typeof blog.$inferSelect, "id"> }>(
    "/:id",
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

  done();
};

export default blogRoute;
