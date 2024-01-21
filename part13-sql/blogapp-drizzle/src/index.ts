import fastify from "fastify";

const server = fastify();

await server.register(import("./routes/blog.js"), { prefix: "/api/blogs" });

server.listen({ port: 3001 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
