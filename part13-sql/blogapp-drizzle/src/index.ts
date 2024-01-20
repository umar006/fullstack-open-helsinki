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

server.listen({ port: 3001 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
