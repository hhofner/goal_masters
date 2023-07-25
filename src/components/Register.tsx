
import * as elements from "typed-html"

export function RegisterUsername({ usernameError, username }: { usernameError?: string, username?: string }) {
  return (
    <label class="flex flex-col" hx-target="this" hx-swap="outerHTML">
      <span class="text-lg">Username</span>
      <input type="text" class="rounded border border-gray-400" name="username" hx-post="/register/username" value={username || ""} />
      {usernameError ? <span class="text-red-400">{usernameError}</span> : ""}
    </label>
  )
}

export function RegisterEmail({ emailError, email }: { emailError?: string, email?: string }) {
  return (
    <label class="flex flex-col" hx-target="this" hx-swap="outerHTML">
      <span class="text-lg">Email</span>
      <input type="email" name="email" class="rounded border border-gray-400" hx-post="/register/email" value={email || ""} />
      {emailError ? <span class="text-red-400">{emailError}</span> : ""}
    </label>
  )
}

export function Register({ usernameError, emailError, username, email, passwordError }: { usernameError?: string, emailError?: string, username?: string, email?: string }) {
  return (
    <div class="flex flex-col gap-4">
      <h1 class="text-3xl">Register</h1>
      <form class="flex flex-col gap-2" hx-post="/register">
        <RegisterUsername usernameError={usernameError} username={username} />
        <RegisterEmail emailError={emailError} email={email} />
        <label class="flex flex-col">
          <span class="text-lg">Password</span>
          <input type="password" name="password" class="rounded border border-gray-400" />
          {passwordError ? <span class="text-red-400">{passwordError}</span> : ""}
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
