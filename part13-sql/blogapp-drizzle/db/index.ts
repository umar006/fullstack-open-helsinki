import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(
  "postgres://postgres:supersecret@localhost:5432/blogapp",
);
const db = drizzle(queryClient);

export default db;
