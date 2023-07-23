import type { Config } from "drizzle-kit";

var dbUrl
var dbAuthToken
if (process.env.ENV === "development") {
  dbUrl = process.env.DEV_DATABASE_URL!
  dbAuthToken = process.env.DEV_DATABASE_AUTH_TOKEN
} else {
  dbUrl = process.env.PROD_DATABASE_URL!
  dbAuthToken = process.env.PROD_DATABASE_AUTH_TOKEN
}

export default {
  schema: "./src/db/schema.ts",
  driver: "turso",
  dbCredentials: {
    url: dbUrl,
    authToken: dbAuthToken,
  },
  verbose: true,
  strict: true,
} satisfies Config;
