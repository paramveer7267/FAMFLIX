import { LogOut, Menu, Search } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthUserStore } from "../store/authUser.js";
import { useContentStore } from "../store/content.js";
import axios from "axios";

const AnimeNav = () => {
  const { user, logout } = useAuthUserStore();
  const { setContentType } = useContentStore();
  const [genres, setGenres] = React.useState([]);
  const [isMobile, setIsMobile] = React.useState(false);
  const handleToggle = () => {
    setIsMobile(!isMobile);
  };

  useEffect(() => {
    try {
      // Fetch genres from the API
      const fetchGenres = async () => {
        const response = await axios.get(
          "/api/v1/anime/genre"
        );
        setGenres(response.data.genres);
      };
      fetchGenres();
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  }, []);
  return (
    <header className="  max-w-6xl mx-auto flex flex-wrap justify-between items-center p-4 h-20">
      <div className="flex items-center justify-center gap-25 z-50 ">
        <Link to="/anime ">
          <img
            src="/anime-logo.png"
            alt="Logo"
            className="w-32 sm:w-40 "
          />
        </Link>
        {/* desktop navbar items*/}
        <div className="hidden sm:flex gap-20 items-center">
          <Link
            to="/anime"
            className="hover:underline"
            onClick={() => setContentType("movie")}
          >
            Home
          </Link>
          <Link
            to="/anime/news"
            className="hover:underline"
            onClick={() => setContentType("tv")}
          >
            Anime News
          </Link>
          <Link to="/history" className="hover:underline">
            History
          </Link>
          <Link to="/watchlist" className="hover:underline">
            Watch List
          </Link>
          <div className="dropdown">
            <Link to="#" className="dropbtn">
              Genres
            </Link>
            <div className="dropdown-content z-50">
              <div className="genre-container max-h-120">
                {genres.map((genre) => (
                  <Link
                    to={`/anime/genre/${genre?.id}/${genre?.name}`}
                    key={genre?.id}
                    className="px-2"
                  >
                    {genre?.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 items-center z-50">
        <Link to="/search">
          <Search className="size-6 cursor-pointer" />
        </Link>
        <img
          src={user.image}
          alt="Avatar logo"
          className="h-6 rounded cursor-pointer"
        />
        <LogOut
          className="size-6 cursor-pointer"
          onClick={logout}
        />
        <div className="sm:hidden">
          <Menu
            className="size-6 cursor-pointer"
            onClick={handleToggle}
          />
        </div>
      </div>

      {/*mobile nav items */}
      {isMobile && (
        <div className="sm:hidden z-90 absolute top-20 left-0 w-full bg-black border border-gray-800 rounded-md shadow-lg">
          <Link
            to="/anime"
            className="hover:underline p-2 block"
          >
            Home
          </Link>
          <Link
            to="/anime/news"
            className="hover:underline p-2 block"
          >
            Anime News
          </Link>
          <Link
            to="/history"
            className="hover:underline p-2 block"
            onClick={handleToggle}
          >
            History
          </Link>
          <Link
            to="/watchlist"
            className="hover:underline p-2 block"
            onClick={handleToggle}
          >
            Watch List
          </Link>
          <Link
            to="#"
            className=" px-2 text-xl block text-red-500 "
          >
            Genres List
          </Link>
          <div className="px-4 py-1 flex flex-wrap text-xs gap-x-5 max-h-145 flex-col">
            {genres.map((genre) => (
              <Link
                to={`/anime/genre/${genre?.id}/${genre?.name}`}
                key={genre?.id}
                className="py-0.5 px-0.5"
              >
                {genre?.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default AnimeNav;
