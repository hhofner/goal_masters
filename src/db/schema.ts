import { InferModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const matches = sqliteTable("matches", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  homeTeam: integer("homeTeam", { mode: "number" }).notNull(),
  awayTeam: integer("awayTeam", { mode: "number" }).notNull(),
  homeScore: integer("homeScore", { mode: "number" }),
  awayScore: integer("awayScore", { mode: "number" }),
  dateTime: text("dateTime").notNull(),
})

export const teams = sqliteTable("teams", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  shortName: text("shortName").notNull(),
  logo: text("logo"),
  league: integer("league", { mode: "number" }).notNull(),
})

export const leagues = sqliteTable("leagues", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  shortName: text("shortName").notNull(),
  logo: text("logo"),
})

export type Match = InferModel<typeof matches>;
export type Team = InferModel<typeof teams>;
export type League = InferModel<typeof leagues>;
