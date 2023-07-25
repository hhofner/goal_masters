import { InferModel, relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  username: text("username").notNull(),
  password: text("password").notNull(),
  email: text("email").notNull(),
})

export const sessions = sqliteTable("sessions", {
  token: text("token").primaryKey(),
  user: integer("user", { mode: "number" }).notNull(),
  expires: text("expires").notNull(),
})

export const usersToSessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.user],
    references: [users.id],
  })
}))

export const matches = sqliteTable("matches", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  homeTeam: integer("homeTeam", { mode: "number" }).notNull(),
  awayTeam: integer("awayTeam", { mode: "number" }).notNull(),
  homeScore: integer("homeScore", { mode: "number" }),
  awayScore: integer("awayScore", { mode: "number" }),
  dateTime: text("dateTime").notNull(),
  matchday: integer("matchday", { mode: "number" }).notNull(),
  league: integer("league", { mode: "number" }).notNull(),
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
  matchdays: integer("matchdays", { mode: "number" }).notNull(),
})

export const matchesToTeamsRelations = relations(matches, ({ one }) => ({
  team: one(teams, {
    fields: [matches.homeTeam, matches.awayTeam],
    references: [teams.id, teams.id],
  }),
}))

export const teamsToLeaguesRelations = relations(teams, ({ one }) => ({
  league: one(leagues, {
    fields: [teams.league],
    references: [leagues.id],
  }),
}))

export const matchesToLeaguesRelations = relations(matches, ({ one }) => ({
  league: one(leagues, {
    fields: [matches.league],
    references: [leagues.id],
  }),
}))

export type Match = InferModel<typeof matches>;
export type Team = InferModel<typeof teams>;
export type League = InferModel<typeof leagues>;
