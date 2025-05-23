import React from "react";
import Navbar from "./components/Navbar";
import MatchNext from "./components/Matchnext";

type Team = {
  id: number;
  name: string;
  crest: string;
};

type Match = {
  id: number;
  utcDate: string;
  status: string;
  matchday: number;
  homeTeam: { id: number; name: string };
  awayTeam: { id: number; name: string };
};

async function getTeams(): Promise<Team[]> {
  const res = await fetch(
    "https://api.football-data.org/v4/competitions/PL/teams",
    {
      headers: {
        "X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY!,
      },
      next: { revalidate: 3600 },
    }
  );
  const data = await res.json();
  return data.teams;
}

async function getMatches(): Promise<{ matches: Match[]; matchday: number }> {
  const res = await fetch(
    "https://api.football-data.org/v4/competitions/PL/matches?status=SCHEDULED",
    {
      headers: {
        "X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY!,
      },
      next: { revalidate: 3600 },
    }
  );
  const data = await res.json();
  const matches: Match[] = data.matches.slice(0, 10);
  const matchday = matches[0]?.matchday || 1;
  return { matches, matchday };
}

export default async function Home() {
  const [{ matches, matchday }, teams] = await Promise.all([
    getMatches(),
    getTeams(),
  ]);
  const teamLogoMap = new Map(teams.map((team) => [team.id, team.crest]));

  return (
    <main className="w-full bg-gray-50">
      {/* Navbar */}
      <section>
        <Navbar />
      </section>

      {/* Match Next  */}
      <section>
        <MatchNext
          matches={matches}
          matchday={matchday}
          teamLogoMap={teamLogoMap}
        />
      </section>
    </main>
  );
}
