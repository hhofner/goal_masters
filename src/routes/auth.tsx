import { html } from "@elysiajs/html"
import Elysia from "elysia"
import * as elements from "typed-html"
import NavBar, { Routes } from "../components/NavBar"
import SelectorBar, { MatchdaySelector } from "../components/SelectorBar"
import { SignIn } from "../components/SignIn"
import { BaseHtml } from ".."
import { matches, teams } from "../db/schema"
import { eq } from "drizzle-orm"
import { db } from "../db"

export default function matchesRoute(app: Elysia) {
  return (
    app
      .use(html())
      .get("/sign-in", ({ html }) => {
        // get current matchday
        return html(
          <BaseHtml>
            <body
              class="flex flex-col w-full gap-4"
            >
              <NavBar selected={Routes.SIGNIN} />
              <div class="w-full h-full flex justify-center items-center">
                <SignIn />
              </div>
            </body>
          </BaseHtml >
        )
      }
      )
      .post("auth/sign-in", ({ body }) => { })
      .get("/register", ({ html, params }) => { })
      .post("auth/register", () => { })
      .post("auth/sign-out", async ({ params }) => { })
  )
}
