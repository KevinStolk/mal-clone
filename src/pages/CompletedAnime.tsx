import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { db } from '../db/firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { FaRegTrashAlt } from 'react-icons/fa';
import MALLogoBlack from '../assets/img/logo_mal_black.png';

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

const CompletedAnime = () => {
  const [anime, setAnime] = useState<IAniList[]>([]);
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setAnime(doc.data()?.animeList);
    });
  }, [user?.email]);

  const aniPath = doc(db, 'users', `${user?.email}`);

  const deleteAnime = async (id: number): Promise<void> => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this anime?'
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
    <div className='pageWrapper'>
      <div className='card my-4'>
        <div className='flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right'>
          <img
            className='w-52 flex my-2 px-2'
            src={MALLogoBlack}
            alt={MALLogoBlack}
          />
          {!user ? (
            <Link to='/signup'>
              <a className='text-primary hover:underline transition'>
                Create an account first to start making a list...
              </a>
            </Link>
          ) : (
            ''
          )}
        </div>
        <div className='status-menu flex flex-col md:flex-row justify-evenly pt-4 pb-6 text-center md:text-right'>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'border-b border-[#2f51a3] font-bold' : ''
            }
            to='/'
          >
            Currently Watching
          </NavLink>
          <NavLink
            to='/completed'
            className={({ isActive }) =>
              isActive ? 'border-b border-[#2f51a3] font-bold' : ''
            }
          >
            Completed
          </NavLink>
        </div>
        <table className='w-full border-collapse text-center'>
          <thead>
            <tr className='border-b'>
              <th></th>
              <th className='px-4'>#</th>
              <th className='text-left'>Anime</th>
              <th></th>
              <th></th>
              <th></th>
              <th className='hidden md:table-cell'>Score</th>
              <th className='hidden sm:table-cell'>Type</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {anime
              ?.filter((ani) => ani.completed)
              .map((ani, index) => (
                <tr
                  className={`${
                    ani.completed ? 'h-[80px] border-b overflow-hidden' : ''
                  } ${
                    ani.completed
                      ? 'line-through h-[80px] border-b overflow-hidden'
                      : ''
                  }`}
                  key={ani.id}
                >
                  <td>
                    <input
                      type='checkbox'
                      checked={ani.completed}
                      onChange={() => toggleCompleted(ani.id)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>
                    <div className='flex items-center'>
                      <img
                        className='w-16 mr-2 pb-2 hover:cursor-pointer'
                        onClick={() => {
                          window.open(`${ani?.url}`, '_blank');
                        }}
                        src={ani?.image}
                        alt={ani?.image}
                      />
                      <p className='hidden sm:table-cell'>{ani.title}</p>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{parseInt(ani.score)}</td>
                  <td className='w-[180px] hidden md:table-cell'>{ani.type}</td>
                  <td className='w-[180px] hidden sm:table-cell'>
                    {ani.watched_episodes} / {ani.episodes}{' '}
                  </td>
                  <td className='pl-8'>
                    <FaRegTrashAlt
                      onClick={() => deleteAnime(ani?.id)}
                      className='cursor-pointer hover:text-red-500 transition'
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedAnime;
