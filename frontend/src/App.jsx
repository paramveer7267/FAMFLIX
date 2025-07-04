import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/home/HomePage";
import WatchPage from "./pages/WatchPage.jsx";
import WatchList from "./pages/WatchList.jsx";
import GenrePage from "./pages/GenrePage.jsx";
import AnimeHomePage from "./pages/home/AnimeHomePage.jsx";
import ActorMovies from "./pages/ActorMovies.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthUserStore } from "./store/authUser.js";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import SearchPage from "./pages/SearchPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import AnimeWatchPage from "./pages/ANIFLIX/AnimeWatchPage.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import AvatarSelector from "./components/AvatarSelector.jsx";
import { ToastContainer} from 'react-toastify';
// import  useUserStore  from "./store/userActions.js";

function App() {
  const { user, isCheckingAuth, authCheck } =
    useAuthUserStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-[#1E90FF] size-10" />
        </div>
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            !user ? <LoginPage /> : <Navigate to={"/"} />
          }
        />
        <Route
          path="/signup"
          element={
            !user ? <SignupPage /> : <Navigate to={"/"} />
          }
        />
        <Route
          path="/watch/:category/:id"
          element={
            user ? (
              <WatchPage />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/search"
          element={
            user ? (
              <SearchPage />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/history"
          element={
            user ? (
              <HistoryPage />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/watchlist"
          element={
            user ? (
              <WatchList />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/anime"
          element={
            user ? (
              <AnimeHomePage />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/anime/watch/:id"
          element={
            user ? (
              <AnimeWatchPage />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/genre/:category/:id/:genreName"
          element={
            user ? (
              <GenrePage />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/actor/movie/:id/:name"
          element={
            user ? (
              <ActorMovies />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/profile/:username"
          element={
            user ? (
              <ProfilePage />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/edit-profile"
          element={
            user ? (
              <AvatarSelector />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toaster position="top-center" />
      <ToastContainer  />
    </>
  );
}

export default App;

// bg-[#1E90FF] hover:bg-[#1f88e5] active:bg-[#529af1]
