import React, { ChangeEvent, useState, useEffect } from "react";
import { Link, NavLink, RouteMatch } from "react-router-dom";
import MALLogoBlack from "../assets/img/logo_mal_black.png";
import MALLogoWhite from "../assets/img/logo_mal.png";
import axios from "axios";
import AnimeItem from "./AnimeItem";
import { UserAuth } from "../context/AuthContext";
import { db } from "../db/firebase";
import { arrayUnion, doc, updateDoc, onSnapshot } from "firebase/firestore";

interface IAniProps {
  id: number;
  title: string;
  image: string;
  episodes: number;
  score: string;
  type: string;
  watched_episodes: number;
}

interface IAniList {
  mal_id: number;
  title: string;
  url: string;
  episodes: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  genres: [{ mal_id: number; name: string }];
  score: string;
  synopsis: string;
  type: string;
}

const Anime: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [searchResult, setSearchResult] = useState<never[]>([]);
  const [error, setError] = useState("");

  const { user } = UserAuth();

  const aniPath = doc(db, "users", `${user?.email}`);

  const searchAnime = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.target.value) {
      setQuery("");
    }
    const url = `https://api.jikan.moe/v4/anime?q=${query}`;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data.data);
        setSearchResult(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  };

  const addAnime = async (anime: IAniList) => {
    setSearchResult([]);
    setQuery("");
    if (user?.email) {
      await updateDoc(aniPath, {
        animeList: arrayUnion({
          id: anime.mal_id,
          title: anime.title,
          image: anime.images.jpg.image_url,
          episodes: anime.episodes,
          score: anime.score,
          type: anime.type,
          url: anime.url,
          watched_episodes: 0,
          completed: false,
        }),
      });
    }
  };

  return (
    <div className="pageWrapper">
      <div className="card my-4">
        {error ? <p className="text-red-500 text-center my-2">{error}</p> : ""}{" "}
        <div className="flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right">
          <img
            className="flex w-52 my-2 px-2 dark:hidden"
            src={MALLogoBlack}
            alt={MALLogoBlack}
          />
          <img
            className="hidden w-52 my-2 px-2 dark:flex"
            src={MALLogoWhite}
            alt={MALLogoWhite}
          />
          {user ? (
            <form onSubmit={searchAnime}>
              <input
                className="w-full bg-primary border border-input px-4 py-2 shadow-xl"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuery(e.target.value)
                }
                type="text"
                placeholder="Search for an anime..."
                value={query}
              />
            </form>
          ) : (
            <Link to="/signup">
              <a className="text-primary hover:underline transition">
                Create an account first to start making a list...
              </a>
            </Link>
          )}
        </div>
        {searchResult.length > 0 ? (
          <div className="results bg-primary mt-2 rounded-lg shadow-2xl max-h-[480px] overflow-y-scroll mb-6">
            {searchResult.map((anime: IAniList) => (
              <div
                key={anime.mal_id}
                className="result flex m-4 p-4 border-slate-500 rounded-lg transition"
              >
                <img
                  className="w-40 rounded-lg mr-4"
                  src={anime.images.jpg.image_url}
                  alt="Image of Anime"
                />
                <div className="details flex-1 flex items-start flex-col">
                  <h3 className="text-[#888] text-lg">{anime.title}</h3>
                  <p className="text-sm mb-2">
                    {anime.synopsis ? anime.synopsis.slice(0, 750) : ""}
                  </p>

                  <ul>
                    <li>Genre:</li>
                    {anime.genres.map((genre) => (
                      <small key={genre.mal_id}>{genre.name}, </small>
                    ))}
                    <li>Score: {parseInt(anime.score)}</li>
                    <li>Type: {anime.type}</li>
                  </ul>
                  <span className="flex-1"></span>
                  <button
                    onClick={() => addAnime(anime)}
                    className="ml-auto bg-primary hover:text-accent appearance-none outline-none cursor-pointer block p-2 rounded text-primary text-sm text-bold uppercase transition"
                  >
                    Add to my list
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
        <div className="status-menu flex flex-col md:flex-row justify-evenly pt-4 pb-6 text-center md:text-right">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-b border-[#2f51a3] font-bold"
                : "bg-red-500 font-thin"
            }
            to="/"
          >
            Currently Watching
          </NavLink>
          <NavLink
            to="/completed"
            className={({ isActive }) =>
              isActive ? "border-b border-[#2f51a3] font-bold" : ""
            }
          >
            Completed
          </NavLink>
        </div>
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="border-b">
              <th></th>
              <th className="px-4">#</th>
              <th className="text-left">Anime</th>
              <th></th>
              <th></th>
              <th></th>
              <th className="hidden md:table-cell">Score</th>
              <th className="hidden sm:table-cell">Type</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            <AnimeItem />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Anime;
