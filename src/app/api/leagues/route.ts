import { NextResponse } from "next/server";

const allowedCompetitions = [
  "WC", // FIFA World Cup
  "CL", // UEFA Champions League
  "BL1", // Bundesliga
  "DED", // Eredivisie
  "BSA", // Campeonato Brasileiro Série A
  "PD", // Primera Division
  "FL1", // Ligue 1
  "ELC", // Championship
  "PPL", // Primeira Liga
  "EC", // European Championship
  "SA", // Serie A
  "PL", // Premier League
];

export async function GET() {
  try {
    const response = await fetch(
      "https://api.football-data.org/v4/competitions",
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_API_KEY || "",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch leagues" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Filter kompetisi berdasarkan kode yang diizinkan
    const filteredCompetitions = data.competitions.filter((comp: any) =>
      allowedCompetitions.includes(comp.code)
    );

    return NextResponse.json({ competitions: filteredCompetitions });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
