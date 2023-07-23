import * as elements from "typed-html";

export enum Routes {
  "MATCHES",
  "TABLES",
  "ABOUT",
  "SIGNIN",
  "REGISTER"
}

function Dot() {
  return <div id="link-indicator" class="rounded-full w-2 h-2 bg-black absolute left-1/2" style="view-transition-name: dot"></div>
}

export default function NavBar({ selected }: { selected: Routes }) {
  return (
    <header class="w-full flex justify-between items-center py-6 px-8 border-b border-grey-400">
      <h1 class="text-4xl">Goal Masters</h1>
      <nav>
        <ul class="flex gap-4">
          <li class={`relative ${selected === Routes.MATCHES ? "" : "text-gray-400"}`}>
            <a href="/">Matches</a>
            {selected === Routes.MATCHES ? <Dot /> : ""}
          </li>
          <li class={`relative ${selected === Routes.TABLES ? "" : "text-gray-400"}`}>
            <a href="/table">Table</a>
            {selected === Routes.TABLES ? <Dot /> : ""}
          </li>
          <li class={`relative ${selected === Routes.ABOUT ? "" : "text-gray-400"}`}>
            <a href="/about">About</a>
            {selected === Routes.ABOUT ? <Dot /> : ""}
          </li>
        </ul>
      </nav>
    </header>
  )
}
