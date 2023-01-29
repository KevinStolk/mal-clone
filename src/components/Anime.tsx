import React, { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import MALLogoBlack from '../assets/img/logo_mal_black.png';
import axios from 'axios';
import AnimeItem from './AnimeItem';

interface IAniProps {
  mal_id: number;
  id: number;
  title: string;
  image: string;
  url: string;
  total_episodes: number;
  synopsis: string;
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
  const [query, setQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<never[]>([]);

  const searchAnime = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.target.value) {
      setQuery('');
    }
    const url = `https://api.jikan.moe/v4/anime?q=${query}`;
    axios
      .get(url)
      .then((res) => {
        setSearchResult(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className='card my-4'>
      <div className='flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right'>
        <img
          className='w-52 flex my-2 px-2'
          src={MALLogoBlack}
          alt={MALLogoBlack}
        />
        <form onSubmit={searchAnime}>
          <input
            className='w-full bg-primary border border-input px-4 py-2 shadow-xl'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            type='text'
            placeholder='Search for an anime...'
          />
        </form>
      </div>
      {searchResult.length > 0 ? (
        <div className='results bg-primary mt-2 rounded-lg shadow-2xl max-h-[480px] overflow-y-scroll mb-6'>
          {searchResult.map((anime: IAniList) => (
            <div
              key={anime.mal_id}
              className='result flex m-4 p-4 border-slate-500 rounded-lg transition'
            >
              <img
                className='w-40 rounded-lg mr-4'
                src={anime.images.jpg.image_url}
                alt='Image of Anime'
              />
              <div className='details flex-1 flex items-start flex-col'>
                <h3 className='text-[#888] text-lg'>{anime.title}</h3>
                <p className='text-sm mb-2'>
                  {anime.synopsis ? anime.synopsis.slice(0, 750) : ''}
                </p>

                <ul>
                  <li>Genre:</li>
                  {anime.genres.map((genre) => (
                    <small key={genre.mal_id}>{genre.name}, </small>
                  ))}
                  <li>Score: {parseInt(anime.score)}</li>
                  <li>Type: {anime.type}</li>
                </ul>
                <span className='flex-1'></span>
                <button className='ml-auto bg-primary hover:text-accent appearance-none outline-none cursor-pointer block p-2 rounded text-primary text-sm text-bold uppercase transition'>
                  Add to my list
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ''
      )}
      <div className='status-menu flex flex-col md:flex-row justify-evenly pt-4 pb-6 text-center md:text-right'>
        <Link to='/'>Currently Watching</Link>
        <Link to='/'>Completed</Link>
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
          <AnimeItem />
        </tbody>
      </table>
    </div>
  );
};

export default Anime;
