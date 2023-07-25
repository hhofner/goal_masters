import * as elements from "typed-html"

export function SignIn() {
  return (
    <div class="flex flex-col gap-4">
      <h1 class="text-3xl">Sign In</h1>
      <form class="flex flex-col gap-2">
        <label class="flex flex-col">
          <span class="text-lg">Username</span>
          <input type="text" class="rounded border border-gray-400" name="username" hx-post="/register/username" hx-indicator="#username-ind" />
          <span id="username-ind"></span>
        </label>
        <label class="flex flex-col">
          <span class="text-lg">Password</span>
          <input type="password" name="password" class="rounded border border-gray-400" hx-post="register/password" hx-indicator="#pass-ind" />
          <span id="password-ind"></span>
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}
