import * as elements from 'typed-html'
import { Match } from '../db/schema';
// TODO: Get these types from the DB schema
type MatchProps = Pick<Match, 'homeTeam' | 'awayTeam' | 'homeScore' | 'awayScore'> & {
  homeTeamName?: string
  awayTeamName?: string
}

type MatchWithName = Match & {
  homeTeamName?: string
  awayTeamName?: string
}

export function MatchComponent({ homeTeamName, awayTeamName, homeTeam, awayTeam, homeScore, awayScore }: MatchProps) {
  return (
    <div class="flex p-2 items-center gap-4">
      <span class="basis-56 text-right">{homeTeamName}</span>
      <div class="flex gap-4 items-center" >
        {homeScore ? <span class="w-8 h-8 flex justify-center items-center">{homeScore}</span> : <input type='text' class='w-8 h-8 rounded border border-gray-400 text-center' />}
        <span>-</span>
        {awayScore ? <span class="w-8 h-8 flex justify-center items-center">{awayScore}</span> : <input type='text' class='w-8 h-8 rounded border border-gray-400 text-center' />}
      </div>
      <span class="basis-56">{awayTeamName}</span>
    </div>
  )
}

export function MatchList({ matches }: { matches: MatchWithName[] }) {
  return (
    <div class="flex flex-col gap-4 px-8 py-4">
      {matches.map((match) => (
        <MatchComponent {...match} />
      ))}
    </div>
  )
}
