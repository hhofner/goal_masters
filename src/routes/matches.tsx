import { html } from "@elysiajs/html"
import Elysia from "elysia"
import * as elements from "typed-html"
import NavBar, { Routes } from "../components/NavBar"
import SelectorBar, { MatchdaySelector } from "../components/SelectorBar"
import { MatchList } from "../components/Matches"
import { BaseHtml } from "..";
import { matches, teams } from "../db/schema"
import { eq } from "drizzle-orm";
import { db } from "../db";

export default function matchesRoute(app: Elysia) {
  return (
    app
      .use(html())
      .get("/", ({ html }) => {
        // get current matchday
        return html(
          <BaseHtml>
            <body
              class="flex flex-col w-full gap-4"
            >
              <NavBar selected={Routes.MATCHES} />
              <SelectorBar leagueId={1} currentMatchday={1} />
              <div
                id="matches"
                hx-get={`/matches/1/1`}
                hx-trigger="load"
              ></div>
            </body>
          </BaseHtml >
        )
      }
      ).get("/:leagueId/:matchday", ({ html, params }) => {
        const leagueId = parseInt(params.leagueId) || 1
        const currentMatchday = parseInt(params.matchday) || 1
        return html(
          <BaseHtml>
            <body
              class="flex flex-col w-full gap-4"
            >
              <NavBar selected={Routes.MATCHES} />
              <SelectorBar leagueId={leagueId} currentMatchday={currentMatchday} />
              <div
                id="matches"
                hx-get={`/matches/${leagueId}/${currentMatchday}`}
                hx-trigger="load"
              ></div>
            </body>
          </BaseHtml >
        )
      }
      )
      .get("matches/:leagueId/:matchday", async ({ params }) => {
        const currentMatchday = parseInt(params.matchday) || 1
        const leagueId = parseInt(params.leagueId) || 1
        const matchesList = await db.select().from(matches).where(eq(matches.league, leagueId)).where(eq(matches.matchday, currentMatchday)).all()
        const teamsList = await db.select().from(teams).where(eq(teams.league, leagueId)).all()
        console.log(teamsList)
        const matchesWithTeamNames = matchesList.map(matchList => ({
          ...matchList,
          homeTeamName: teamsList.find(team => team.id === matchList.homeTeam)?.name,
          awayTeamName: teamsList.find(team => team.id === matchList.awayTeam)?.name
        }))
        return (
          <div>
            <MatchdaySelector currentMatchday={currentMatchday} leagueId={leagueId} />
            <MatchList matches={matchesWithTeamNames} />
          </div >
        )
      })
  )
}
