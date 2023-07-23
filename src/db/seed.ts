import { db } from "./index"
import { League, Match, Team, leagues, matches, teams } from "./schema"

// Seed a few teams
const eplTeams1 = [
  { name: "Arsenal", shortName: "ARS", logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg", league: 1 },
  { name: "Aston Villa", shortName: "AVL", logo: "https://upload.wikimedia.org/wikipedia/de/9/9f/Aston_Villa_logo.svg", league: 1 },
  { name: "Brighton & Hove Albion", shortName: "BHA", logo: "https://upload.wikimedia.org/wikipedia/en/f/fd/Brighton_%26_Hove_Albion_logo.svg", league: 1 },
  { name: "Burnley", shortName: "BUR", logo: "https://upload.wikimedia.org/wikipedia/en/0/02/Burnley_FC_badge.png", league: 1 },
  { name: "Chelsea", shortName: "CHE", logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg", league: 1 },
  { name: "Crystal Palace", shortName: "CRY", logo: "https://upload.wikimedia.org/wikipedia/de/b/bf/Crystal_Palace_F.C._logo_%282013%29.png", league: 1 },
  { name: "Everton", shortName: "EVE", logo: "https://upload.wikimedia.org/wikipedia/de/f/f9/Everton_FC.svg", league: 1 },
  { name: "Fulham", shortName: "FUL", logo: "https://upload.wikimedia.org/wikipedia/de/e/eb/Fulham_fc.svg", league: 1 },
  { name: "Leeds United", shortName: "LEE", logo: "https://upload.wikimedia.org/wikipedia/en/5/54/Leeds_United_F.C._logo.svg", league: 1 },
  { name: "Leicester City", shortName: "LEI", logo: "https://upload.wikimedia.org/wikipedia/en/2/2d/Leicester_City_crest.svg", league: 1 },
  { name: "Liverpool", shortName: "LIV", logo: "https://upload.wikimedia.org/wikipedia/de/0/0a/FC_Liverpool.svg", league: 1 },
  { name: "Manchester City", shortName: "MCI", logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg", league: 1 },
  { name: "Manchester United", shortName: "MUN", logo: "https://upload.wikimedia.org/wikipedia/de/7/7a/Manchester_United_FC.svg", league: 1 },
  { name: "Newcastle United", shortName: "NEW", logo: "https://upload.wikimedia.org/wikipedia/de/5/56/Newcastle_United_Logo.svg", league: 1 },
  { name: "Sheffield United", shortName: "SHU", logo: "https://upload.wikimedia.org/wikipedia/en/9/9c/Sheffield_United_FC_logo.svg", league: 1 },
  { name: "Southampton", shortName: "SOU", logo: "https://upload.wikimedia.org/wikipedia/de/c/c9/FC_Southampton.svg", league: 1 },
  { name: "Tottenham Hotspur", shortName: "TOT", logo: "https://upload.wikimedia.org/wikipedia/de/b/b4/Tottenham_Hotspur.svg", league: 1 },
  { name: "West Bromwich Albion", shortName: "WBA", logo: "https://upload.wikimedia.org/wikipedia/de/8/8b/West_Bromwich_Albion.svg", league: 1 },
  { name: "West Ham United", shortName: "WHU", logo: "https://upload.wikimedia.org/wikipedia/de/e/e0/West_Ham_United_FC.svg", league: 1 },
  { name: "Wolverhampton Wanderers", shortName: "WOL", logo: "https://upload.wikimedia.org/wikipedia/en/f/fc/Wolverhampton_Wanderers.svg", league: 1 },
]
// Seed league
const seedLeagues = [
  { name: "English Premier League", shortName: "EPL", matchdays: 38 },
  { name: "Bundesliga", shortName: "BUN", matchdays: 34 },
  { name: "La Liga", shortName: "LAL", matchdays: 38 },
]

const seedMatches = [
  { homeTeam: 1, awayTeam: 2, matchday: 1, league: 1, dateTime: "2020-09-12 15:00:00.000" },
  { homeTeam: 3, awayTeam: 4, matchday: 1, league: 1, dateTime: "2020-09-12 15:00:00.000" },
  { homeTeam: 5, awayTeam: 6, matchday: 1, league: 1, dateTime: "2020-09-12 17:30:00.000" },
  { homeTeam: 7, awayTeam: 8, matchday: 1, league: 1, dateTime: "2020-09-12 20:00:00.000" },
  { homeTeam: 9, awayTeam: 10, matchday: 1, league: 1, dateTime: "2020-09-13 14:00:00.000" },
  { homeTeam: 11, awayTeam: 12, matchday: 1, league: 1, dateTime: "2020-09-13 16:30:00.000" },
  { homeTeam: 13, awayTeam: 14, matchday: 1, league: 1, dateTime: "2020-09-13 19:00:00.000" },
  { homeTeam: 15, awayTeam: 16, matchday: 1, league: 1, dateTime: "2020-09-14 17:30:00.000" },
  { homeTeam: 17, awayTeam: 18, matchday: 1, league: 1, dateTime: "2020-09-14 20:00:00.000" },
  { homeTeam: 1, awayTeam: 3, matchday: 2, league: 1, dateTime: "2020-09-19 12:30:00.00" },
]

async function seed() {
  await db.insert(leagues).values(seedLeagues).onConflictDoNothing().all()
  await db.insert(teams).values(eplTeams1).onConflictDoNothing().all()
  await db.insert(matches).values(seedMatches).onConflictDoNothing().all()
}

seed()
