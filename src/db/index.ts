import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

// If dev use dev database URL
var client
if (process.env.NODE_ENV === "development") {
  client = createClient({
    url: process.env.DEV_DATABASE_URL!,
    authToken: process.env.DEV_DATABASE_AUTH_TOKEN,
  });
} else {
  client = createClient({
    url: process.env.PROD_DATABASE_URL!,
    authToken: process.env.PROD_DATABASE_AUTH_TOKEN,
  });
}

export const db = drizzle(client, { schema, logger: true });
