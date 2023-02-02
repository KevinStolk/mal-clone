import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { db } from "../db/firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { FaRegTrashAlt } from "react-icons/fa";

interface IAniList {
  id: number;
  image: string;
  title: string;
  score: string;
  type: string;
  url: string;
  episodes: number;
  watched_episodes: number;
  completed: boolean;
}

const AnimeItem = () => {
  const [anime, setAnime] = useState<IAniList[]>([]);
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setAnime(doc.data()?.animeList);
    });
  }, [user?.email]);

  const aniPath = doc(db, "users", `${user?.email}`);

  const deleteAnime = async (id: number): Promise<void> => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this anime?"
    );
    if (!confirmation) {
      return;
    }

    try {
      const res: IAniList[] = anime.filter((item: IAniList) => item.id !== id);
      await updateDoc(aniPath, {
        animeList: res,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEpisodeChange = (id: number, action: "add" | "remove") => {
    const selectedAnime = anime.find((ani) => ani.id === id);
    if (!selectedAnime) return;

    let updatedWatchedEpisodes = selectedAnime.watched_episodes;
    if (action === "add") {
      updatedWatchedEpisodes += 1;
    } else if (action === "remove") {
      updatedWatchedEpisodes -= 1;
    }

    const updatedAnimeList = anime.map((ani) => {
      if (ani.id === id) {
        return {
          ...ani,
          watched_episodes: updatedWatchedEpisodes,
        };
      }
      return ani;
    });

    updateDoc(aniPath, {
      animeList: updatedAnimeList,
    });
  };

  const toggleCompleted = (id: number) => {
    const updatedAnimeList = anime.map((ani) => {
      if (ani.id === id) {
        return {
          ...ani,
          completed: !ani.completed,
        };
      }
      return ani;
    });

    updateDoc(aniPath, {
      animeList: updatedAnimeList,
    });
  };

  return (
    <>
      {anime
        ?.filter((ani) => !ani.completed)
        .map((ani, index) => (
          <tr
            className={`${
              ani.completed
                ? "bg-gray-300 h-[80px] border-b overflow-hidden"
                : ""
            } ${
              ani.completed
                ? "line-through h-[80px] border-b overflow-hidden"
                : ""
            }`}
            key={ani.id}
          >
            <td>
              <input
                type="checkbox"
                checked={ani.completed}
                onChange={() => toggleCompleted(ani.id)}
              />
            </td>
            <td>{index + 1}</td>
            <td>
              <div className="flex items-center">
                <img
                  className="w-16 mr-2 pb-2 hover:cursor-pointer"
                  onClick={() => {
                    window.open(`${ani?.url}`, "_blank");
                  }}
                  src={ani?.image}
                  alt={ani?.image}
                />
                <p className="hidden sm:table-cell">{ani.title}</p>
              </div>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>{parseInt(ani.score)}</td>
            <td className="w-[180px] hidden md:table-cell">{ani.type}</td>
            <td className="w-[180px] hidden sm:table-cell">
              {ani.watched_episodes > 0 ? (
                <button
                  onClick={() => handleEpisodeChange(ani.id, "remove")}
                  className="bg-button text-white cursor-pointer p-2 mr-2 rounded text-sm text-bold uppercase transition"
                >
                  -
                </button>
              ) : (
                ""
              )}
              {ani.watched_episodes} / {ani.episodes}{" "}
              {ani.episodes !== ani.watched_episodes ? (
                <button
                  onClick={() => handleEpisodeChange(ani.id, "add")}
                  className="bg-button text-white cursor-pointer  p-2 mr-2 rounded text-sm text-bold uppercase transition"
                >
                  +
                </button>
              ) : (
                ""
              )}
            </td>
            <td className="pl-8">
              <FaRegTrashAlt
                onClick={() => deleteAnime(ani?.id)}
                className="cursor-pointer hover:text-red-500 transition"
              />
            </td>
          </tr>
        ))}
    </>
  );
};
export default AnimeItem;
