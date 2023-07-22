import { html } from "@elysiajs/html";
import Elysia from "elysia";
import * as elements from "typed-html";
import NavBar, { Routes } from "../components/NavBar";
import SelectorBar, { MatchdaySelector } from "../components/SelectorBar";
import { BaseHtml } from "..";

export default function matchesRoute(app: Elysia) {
  return (
    app
      .use(html())
      .get("/", ({ html, params }) =>
        html(
          <BaseHtml>
            <body
              class="flex flex-col w-full gap-4"
            >
              <NavBar selected={Routes.MATCHES} />
              <SelectorBar leagueId={1} currentMatchday={1} />
              <div
                id="matches"
              ></div>
            </body>
          </BaseHtml >
        )
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
              ></div>
            </body>
          </BaseHtml >
        )
      }
      )
      .get("matches/:leagueId/:matchday", ({ params }) => {
        // Convert params.matchday to number and params.leagueId to number if failed return 404
        const currentMatchday = parseInt(params.matchday) || 1
        const leagueId = parseInt(params.leagueId) || 1
        return (
          <div>
            <MatchdaySelector currentMatchday={currentMatchday} leagueId={leagueId} />
            <h1 class="text-blue-400"> Matchday {params.matchday} </h1>
          </div >
        )
      })
  )
}
