import React, { useEffect, useRef } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = React.useState([]);
  const [showArrows, setShowArrows] = React.useState(false);
  const sliderRef = useRef(null);

  const formattedC =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);
  const formatted =
    contentType === "movie" ? "Movies" : null;
  useEffect(() => {
    const getContent = async () => {
      const res = await axios.get(
        `/api/v1/${contentType}/${category}`
      );
      setContent(res.data.content);
    };
    getContent();
  }, [contentType, category]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      <div
        className="text-white bg-black relative px-5 md:px-20"
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
      >
        <h2 className="mb-4 text-2xl font-bold">
          {formattedC} {formatted}
        </h2>

        <div
          ref={sliderRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide"
        >
          {content.map((item) => (
            <Link
              key={item?.id}
              to={`/watch/${contentType}/${item?.id}`}
              className="min-w-[250px] relative group"
            >
              <div className="rounded-lg overflow-hidden">
                <img
                  src={
                    SMALL_IMG_BASE_URL + item?.backdrop_path
                  }
                  alt="Movie Img"
                  className="transition-transform duration-400 ease-in-out group-hover:scale-125"
                />
              </div>
              <p className="mt-2 text-center ">
                {item.title || item.name}
              </p>
            </Link>
          ))}
        </div>
        {showArrows && (
          <>
            <button
              className=" hidden sm:flex absolute top-1/2 -translate-y-1/2 left-5 md:left-24 items-center justify-center
        size-10 rounded-full bg-black/50  hover:bg-black/75 text-white z-10"
              onClick={scrollLeft}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="hidden sm:flex absolute top-1/2 -translate-y-1/2 right-5 md:right-24 items-center justify-center
        size-10 rounded-full bg-black/50  hover:bg-black/75 text-white z-10"
              onClick={scrollRight}
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default MovieSlider;
