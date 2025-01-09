
import React from 'react'

interface FilmCardProps {
    film: {
        title: string,
        director: string,
        year: number,
        description: string,
        
    }
}

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
    return (
        <div className="film-card">
            <img alt={film.title} />
            <h2>{film.title}</h2>
            <p>{film.description}</p>
        </div>
    )
}

export default FilmCard