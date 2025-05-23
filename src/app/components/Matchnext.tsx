"use client";

import React, { useEffect, useState } from "react";

type TeamLogoMap = Map<number, string>;

type Match = {
  id: number;
  utcDate: string;
  status: string;
  matchday: number;
  homeTeam: { id: number; name: string };
  awayTeam: { id: number; name: string };
};

type MatchNextProps = {
  matches: Match[];
  matchday: number;
  teamLogoMap: TeamLogoMap;
};

type League = {
  id: number;
  name: string;
  emblem: string;
};

export default function MatchSection({
  matches,
  matchday,
  teamLogoMap,
}: MatchNextProps) {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const res = await fetch("/api/leagues");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setLeagues(data.competitions);
      } catch (err) {
        console.error("Gagal fetch leagues:", err);
      }
    };

    fetchLeagues();
  }, []);

  // Hitung halaman total
  const totalPages = Math.ceil(leagues.length / itemsPerPage);

  // Ambil data liga untuk halaman sekarang
  const currentLeagues = leagues.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Kolom Kanan: List Nama Liga dengan Pagination */}
        <div className="lg:w-1/3 w-full space-y-2">
          <div className="flex justify-center">
            <h1 className="text-xl text-gray-600 font-semibold mb-2">
              Daftar Liga
            </h1>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <ul className="space-y-3">
              {currentLeagues.map((league) => (
                <li key={league.id}>
                  <button className="w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 text-gray-700 font-medium border border-gray-200">
                    <img
                      src={league.emblem}
                      alt={league.name}
                      className="w-6 h-6 object-contain"
                    />
                    <span>{league.name}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 space-x-3">
              <button
                className={`px-4 py-2 rounded-md font-semibold border transition-colors duration-200
                  ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-600 cursor-not-allowed border-gray-300"
                      : "bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
                  }`}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              <span className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 font-medium select-none">
                {currentPage} / {totalPages}
              </span>

              <button
                className={`px-4 py-2 rounded-md font-semibold border transition-colors duration-200
                  ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-600 cursor-not-allowed border-gray-300"
                      : "bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
                  }`}
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        {/* Kolom Kiri: Match Selanjutnya */}
        <div className="lg:w-2/3 w-full space-y-2">
          <div className="flex justify-center">
            <h1 className="text-xl text-gray-600 font-semibold mb-2">
              Matchweek {matchday}
            </h1>
          </div>
          {matches.map((match) => (
            <div
              key={match.id}
              className="border border-gray-200 bg-white p-6 rounded-xl hover:shadow-lg flex flex-col sm:flex-row items-center sm:justify-between gap-4"
            >
              {/* Time & Date */}
              <div className="flex justify-center items-center gap-2 text-center text-sm text-gray-600 min-w-[90px]">
                <div>
                  {new Date(match.utcDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                  })}
                </div>
                <div className="text-blue-700 font-semibold">
                  {new Date(match.utcDate).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              {/* Home & Away */}
              <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto sm:gap-4">
                <div className="flex items-center gap-2 w-full sm:w-[120px] justify-center sm:justify-start">
                  <img
                    src={teamLogoMap.get(match.homeTeam.id)!}
                    alt={`${match.homeTeam.name} logo`}
                    className="w-14 h-14 object-contain"
                  />
                  <span className="text-sm font-medium text-gray-800 truncate">
                    {match.homeTeam.name}
                  </span>
                </div>

                <span className="text-gray-500 text-lg font-bold sm:mx-2 self-center sm:self-auto">
                  vs
                </span>

                <div className="flex items-center gap-2 w-full sm:w-[120px] justify-center sm:justify-end">
                  <span className="text-sm font-medium text-gray-800 truncate text-center sm:text-right">
                    {match.awayTeam.name}
                  </span>
                  <img
                    src={teamLogoMap.get(match.awayTeam.id)!}
                    alt={`${match.awayTeam.name} logo`}
                    className="w-14 h-14 object-contain"
                  />
                </div>
              </div>

              {/* Detail Match */}
              <div className="text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap bg-yellow-200 text-yellow-800 mt-2 sm:mt-0">
                Detail Match
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
