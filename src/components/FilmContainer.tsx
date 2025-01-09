import React from 'react'
import {films} from '../temp_db/db'
import FilmCard from './FilmCard'

type Film = {
  title: string;
  director: string;
  year: number;
  description: string;
};

const FilmContainer: React.FC = () => {

function handleFilmCardRender(){
  return(
    <>
    {films.map((film: Film, index: number) => (
      <FilmCard key={index} film={film} />
    ))}
    </>
  )
}

  return (
    <div>
      {handleFilmCardRender()}
    </div>
  )
}

export default FilmContainer