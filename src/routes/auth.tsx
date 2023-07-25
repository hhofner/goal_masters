import { html } from "@elysiajs/html"
import Elysia from "elysia"
import * as elements from "typed-html"
import NavBar, { Routes } from "../components/NavBar"
import { SignIn } from "../components/SignIn"
import { Register, RegisterUsername, RegisterEmail } from "../components/Register"
import { BaseHtml } from ".."
import { teams, users } from "../db/schema"
import { eq } from "drizzle-orm"
import { db } from "../db"
import { cookie } from '@elysiajs/cookie'

export default function authRoutes(app: Elysia) {
  return (
    app
      .use(html())
      .use(cookie())
      .get('/profile', ({ cookie: { name } }) => { console.log(name); return name })
      .get("/sign-in", ({ html }) => {
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
      .post("auth/sign-in", ({ }) => { })
      .get("/register", ({ html }) => {
        return html(
          <BaseHtml>
            <body
              class="flex flex-col w-full gap-4"
            >
              <NavBar selected={Routes.SIGNIN} />
              <div class="w-full h-full flex justify-center items-center">
                <Register />
              </div>
            </body>
          </BaseHtml >
        )
      })
      .post("/register", async ({ body }) => {
        const { email, password, username } = body
        const matchingUsernames = await db.select({ username: users.username }).from(users).where(eq(users.username, username)).all()
        const matchingEmails = await db.select().from(users).where(eq(users.email, email)).all()
        if (matchingUsernames.length < 0 && matchingEmails.length < 0) {
          return "success"
        } else {
          return "failure"
        }
        // return db.insert(teams, {
        //   email,
        //   password,
        //   name,
        //   matches: []
        // })
      })
      .post("/register/username", async ({ body }) => {
        if (body.username) {
          // sanitize here baby
          const result = await db.select({ username: users.username }).from(users).where(eq(users.username, body.username)).all()
          if (result.length > 0) {
            return <RegisterUsername usernameError="Username already exists" username={body.username} />
          } else {
            return <RegisterUsername username={body.username} />
          }
        } else {
          return <RegisterUsername usernameError="Username is empty" />
        }
      })
      .post("register/email", async ({ body }) => {
        if (body.email) {
          const result = await db.select().from(users).where(eq(users.email, body.email)).all()
          if (result.length > 0) {
            return <RegisterEmail emailError="Email already exists" email={body.email} />
          } else {
            return <RegisterEmail email={body.email} />
          }
        } else {
          return <RegisterEmail emailError="Email is empty" />
        }
      })
      .post("sign-in/email", async ({ body }) => {
        const user = await db.findFirst(teams, eq(teams.email, email))
        if (user) {
          return { error: "Email already exists" }
        }
        return { success: "Email is available" }
      })
      .post("auth/sign-out", async ({ params }) => { })
  )
}
