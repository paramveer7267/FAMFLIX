import React, { useEffect, useState, useRef } from "react";
import useWatchStore from "../store/watchStore";
import { servers } from "../utils/constants";

const TvEpisodes = ({ id, onSetData, seasons, server }) => {
  const { setCurrentWatch, getWatchHistoryById } = useWatchStore();

  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const episodesRef = useRef(null);

  // 🔥 Load from history or default
  useEffect(() => {
    const saved = getWatchHistoryById(id);
console.log("Saved watch history for ID", id, ":", saved);
    if (saved && saved.type === "tv") {
      const savedSeason = seasons.find((s) => s.season_number === saved.season);

      if (savedSeason) {
        setSelectedSeason(savedSeason);
        setSelectedEpisode(String(saved.episode));

        onSetData({
          id,
          showSeason: saved.season,
          showEpisode: saved.episode,
          server: saved.server,
        });

        return;
      }
    }

    if (seasons?.length > 0) {
      const firstSeason = seasons.find(
        (s) => s.episode_count > 0 && s.season_number !== 0,
      );
      if (firstSeason) {
        setSelectedSeason(firstSeason);
        setSelectedEpisode("1");
        setCurrentWatch({
          contentId: id,
          type: "tv",
          season: firstSeason.season_number,
          episode: 1,
          server: servers[0].key,
        });

        onSetData({
          id,
          showSeason: firstSeason.season_number,
          showEpisode: 1,
          server: servers[0].key,
        });
      }
    }
  }, [id, seasons, getWatchHistoryById, setCurrentWatch, onSetData]);

  // 🔥 Update player
  useEffect(() => {
    if (selectedSeason && selectedEpisode !== "") {
      const sNum = selectedSeason.season_number;
      const eNum = parseInt(selectedEpisode);

      onSetData({
        id,
        showSeason: sNum,
        showEpisode: eNum,
        server: server,
      });

      setCurrentWatch({
        contentId: id,
        type: "tv",
        season: sNum,
        episode: eNum,
        server: server,
      });
    }
  }, [selectedSeason, selectedEpisode, server, id, onSetData, setCurrentWatch]);

  // Scroll to episode
  useEffect(() => {
    if (!episodesRef.current || !selectedEpisode) return;

    const el = episodesRef.current.querySelector(
      `[data-ep="${selectedEpisode}"]`,
    );

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "bottom",
        inline: "center",
      });
    }
  }, [selectedEpisode]);

  return (
    <div className="flex flex-col max-w-6xl items-center gap-4">
      {/* 🔥 Seasons */}
      <div className="flex gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide max-w-80 px-1">
        {seasons
          ?.filter((s) => s.episode_count > 0 && s.season_number !== 0)
          .map((season) => (
            <button
              key={season?.id}
              onClick={() => {
                setSelectedSeason(season);
                setSelectedEpisode("1");
              }}
              className={`flex-shrink-0 px-4 py-3 rounded-lg text-sm transition 
              ${
                selectedSeason?.season_number === season.season_number
                  ? "bg-blue-600"
                  : "bg-gray-600"
              } text-white`}
            >
              {season?.name}
            </button>
          ))}
      </div>

      {/* 🔥 Episodes Section */}
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 text-lg font-bold px-6 py-4">
          <p>Episodes</p>

          <div className="flex items-center gap-2">
            {/* 🔥 Input */}
            <input
              type="number"
              min="1"
              max={selectedSeason?.episode_count}
              value={selectedEpisode}
              onChange={(e) => {
                const value = e.target.value;

                if (
                  value === "" ||
                  (Number(value) >= 1 &&
                    Number(value) <= selectedSeason?.episode_count)
                ) {
                  setSelectedEpisode(value);
                }
              }}
              placeholder="# Find"
              className="px-2 py-1 text-base rounded bg-gray-700 text-white w-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* 🔥 Toggle Layout */}
            <button
              onClick={() =>
                setViewMode((prev) => (prev === "grid" ? "vertical" : "grid"))
              }
              className="bg-gray-700 px-2 py-0.5 rounded text-white hover:bg-gray-600 transition"
              title="Change layout"
            >
              ☰
            </button>
          </div>
        </div>

        {/* 🔥 Episodes */}
        {selectedSeason && (
          <div
            ref={episodesRef}
            className={`
              ${
                viewMode === "grid"
                  ? "flex flex-wrap justify-center"
                  : viewMode === "vertical"
                    ? "flex flex-col items-center"
                    : "flex overflow-x-auto whitespace-nowrap"
              }
              rounded overflow-y-auto max-h-[200px] px-2 py-6 gap-2 min-h-[48px]
            `}
          >
            {[...Array(selectedSeason.episode_count)].map((_, index) => {
              const epNumber = (index + 1).toString();

              return (
                <button
                  key={epNumber}
                  data-ep={epNumber}
                  onClick={() => setSelectedEpisode(epNumber)}
                  className={`flex-shrink-0 ${
                    viewMode === "vertical" ? "w-full max-w-full" : "w-12"
                  } 
                  ${
                    selectedEpisode === epNumber ? "bg-blue-500" : "bg-gray-700"
                  } 
                  text-white rounded-lg px-2 py-2 text-sm transition`}
                >
                  {viewMode === "grid" ? `${epNumber}` : `Episode ${epNumber}`}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TvEpisodes;
