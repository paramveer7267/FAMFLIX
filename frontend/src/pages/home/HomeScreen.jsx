import React from "react";
import MovieSlider from "../../components/MovieSlider.jsx";
import Navbar from "../../components/Navbar.jsx";
import { Link } from "react-router-dom";
import { Info, Play } from "lucide-react";
import useGetTrendingContent from "../../hooks/useGetTrendingContent.jsx";
import {
  ORIGINAL_IMG_BASE_URL,
  MOVIE_CATEGORIES,
  TV_CATEGORIES,
} from "../../utils/constants.js";
import { useContentStore } from "../../store/content.js";
import { useNavigate } from "react-router-dom";
import { toast as toastify } from "react-toastify";
import SplashScreen from "../../components/SplashScreen";

const HomeScreen = () => {
  const navigate = useNavigate();
  const { trendingContent } = useGetTrendingContent();
  const { contentType } = useContentStore();
  const [imgLoading, setImgLoading] = React.useState(true);
  const [showSplash, setShowSplash] = React.useState(() => {
    return localStorage.getItem("justLoggedIn") === "true";
  });

  // Show splash screen on first load
  React.useEffect(() => {
    if (showSplash) {
      const timeout = setTimeout(() => {
        setShowSplash(false);

        // Show toast after splash ends
        if (localStorage.getItem("justLoggedIn")) {
          toastify(
            "👋 Hey there, Dev here, just wanted to let you know, you can now customize your Profile and I have added New Avatars. Go check it out! 😎",
            {
              position: "bottom-left",
              theme: "light",
              autoClose: 8000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
          localStorage.removeItem("justLoggedIn");
        }
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [showSplash]);

  const handleToggle = (e) => {
    if (e.target.checked) {
      navigate("/anime");
    }
  };

  // Splash screen renders first
  if (showSplash) {
    return (
      <SplashScreen onEnd={() => setShowSplash(false)} />
    );
  }

  if (!trendingContent) {
    return (
      <div className="min-h-screen text-white relative">
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
      </div>
    );
  }

  return (
    <>
      <div className="relative min-h-screen text-white">
        <Navbar />

        {imgLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
        )}

        <img
          src={
            ORIGINAL_IMG_BASE_URL +
            trendingContent?.backdrop_path
          }
          onLoad={() => setImgLoading(false)}
          alt="hero img"
          className="absolute top-0 left-0 w-full h-full object-cover -z-50"
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50"
          aria-hidden="true"
        />

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
          <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute top-0 left-0 w-full h-full -z-10" />
          <div className="max-w-2xl">
            <h1 className="mt-4 md:text-6xl text-4xl font-extrabold text-balance">
              {trendingContent?.title ||
                trendingContent?.name}
            </h1>
            <p className="mt-2 text-lg">
              {trendingContent?.release_date?.split(
                "-"
              )[0] ||
                trendingContent?.first_air_date?.split(
                  "-"
                )[0]}{" "}
              |{" "}
              {trendingContent?.adult
                ? "Adult Content"
                : "PG-13"}
            </p>
            <p className="mt-4 sm:text-lg">
              {trendingContent?.overview.length > 200
                ? trendingContent.overview.slice(0, 200) +
                  "..."
                : trendingContent?.overview}
            </p>
          </div>

          <div className="flex mt-8">
            <Link
              to={`/watch/${contentType}/${trendingContent?.id}`}
              className="bg-white hover:bg-white/80 text-black font-bold px-4 py-2 rounded mr-4 flex items-center"
            >
              <Play className="size-6 inline-block mr-2 fill-black" />
              Play
            </Link>
            <Link
              to={`/watch/${contentType}/${trendingContent?.id}`}
              className="bg-gray-500/70 hover:bg-gray-500 text-white font-bold px-4 py-2 rounded mr-4 flex items-center"
            >
              <Info className="size-6 inline-block mr-2" />
              More Info
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10 bg-black py-10">
        <h2 className="text-2xl md:text-4xl mx-auto text-white px-5 font-bold md:px-20">
          {contentType.toUpperCase()}
          {contentType === "tv" ? " Shows" : "S"}
        </h2>

        {contentType === "movie"
          ? MOVIE_CATEGORIES.map((category) => (
              <MovieSlider
                key={category}
                category={category}
              />
            ))
          : contentType === "tv"
          ? TV_CATEGORIES.map((category) => (
              <MovieSlider
                key={category}
                category={category}
              />
            ))
          : null}

        <div className="flex flex-col items-center justify-center font-semibold">
          <h2 className="mb-2 text-white text-lg lg:text-2xl">
            Switch to Anime World
          </h2>
          <label className="switch">
            <input
              type="checkbox"
              onChange={handleToggle}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
