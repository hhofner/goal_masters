import * as elements from "typed-html"
// Extend select type to include `autocomplete` as a valid attribute
declare global {
  namespace JSX {
    interface HtmlSelectTag extends HtmlSelectTag {
      autocomplete?: string
    }
  }
}

export function LeagueSelector({ selectedLeagueId }: { selectedLeagueId: number }) {
  return (
    <select class="p-2 rounded" autocomplete="off">
      <option value="1" selected={selectedLeagueId === 1}>
        Bundesliga
      </option>
      <option value="2" selected={selectedLeagueId === 2}>Premier League</option>
      <option value="3" selected={selectedLeagueId === 3}>La Liga</option>
    </select>
  )
}

export function MatchdaySelector({ currentMatchday, leagueId }: { currentMatchday: number, leagueId: number }) {
  // TODO: get max matchday
  const beforeMatchday = Math.max(currentMatchday - 1, 1)
  const afterMatchday = currentMatchday + 1
  return (
    <div class="flex gap-2 items-center" id="matchdaySelector" hx-swap-oob="true">
      <button
        class="flex"
        hx-get={`/matches/${leagueId}/${beforeMatchday}`}
        hx-target="#matches"
        hx-swap="innerHTML"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10.05 16.94v-4h8.92l.03-2.01h-8.95V6.94l-5 5Z"></path></svg>
      </button>
      <span>
        Matchday {currentMatchday}
      </span>
      <button
        class="flex"
        hx-get={`/matches/${leagueId}/${afterMatchday}`}
        hx-target="#matches"
        hx-swap="innerHTML"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14 16.94v-4H5.08l-.03-2.01H14V6.94l5 5Z"></path></svg>
      </button>
    </div >
  )
}

export default function SelectorBar({ leagueId, currentMatchday }: { leagueId: number, currentMatchday: number }) {
  return (
    <div class="w-full flex px-4 py-2 gap-8 items-center">
      <LeagueSelector selectedLeagueId={leagueId} />
      <MatchdaySelector currentMatchday={currentMatchday} leagueId={leagueId} />
    </div>
  )
}
