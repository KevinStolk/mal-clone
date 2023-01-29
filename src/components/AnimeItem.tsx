import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { db } from '../db/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

interface IAniList {
  id: number;
  image: string;
  title: string;
  score: string;
  type: string;
  url: string;
  episodes: string;
}

const AnimeItem = () => {
  const [anime, setAnime] = useState<IAniList[]>([]);
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setAnime(doc.data()?.animeList);
    });
  }, [user?.email]);

  return (
    <>
      {anime?.map((ani, index) => (
        <tr className='h-[80px] border-b overflow-hidden'>
          <td key={ani.id}>
            <input type='checkbox' className='cursor-pointer' />
          </td>
          <td>{index}</td>
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
          <td>{ani.score}</td>
          <td className='w-[180px] hidden md:table-cell'>{ani.type}</td>
          <td className='w-[180px] hidden sm:table-cell'>{ani.episodes}</td>
          <td></td>
        </tr>
      ))}
    </>
  );
};
export default AnimeItem;
