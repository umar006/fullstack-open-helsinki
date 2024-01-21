import fastify from "fastify";

const app = fastify();

await app.register(import("./routes/blog.js"), { prefix: "/api/blogs" });

export default app;
