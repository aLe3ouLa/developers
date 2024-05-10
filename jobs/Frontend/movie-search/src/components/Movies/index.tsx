
import { Movie } from '@/types/Movie';
import { useRouter } from 'next/navigation';
import React from 'react'
import MovieCard from '../MovieCard';

type MoviesProps = {
    movies: Movie[]
}

export default function Movies({ movies }: MoviesProps) {
    const { push } = useRouter();
    const handleClick = (movieId: number) => {
        push(`/movies/${movieId}`)
    }

    return (movies ? (<ul>
        {
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} handleClick={handleClick} />)
        }
    </ul >) : (<p>Please search for a movie</p>)
    )
}
