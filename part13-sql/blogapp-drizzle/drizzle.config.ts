import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema/*.ts",
  out: "./db/migration",
  driver: "pg",
  dbCredentials: {
    connectionString: "postgres://postgres:supersecret@localhost:5432/blogapp",
  },
});
