import { MovieApi } from './types/MovieApi'
import { ReactElement } from 'react'

export default function MovieInformation(movie: MovieApi): ReactElement {
  /*
  * Format runtime from seconds to HH:MM
  */
  function formatRuntime(runtime: string): string {
    const runtimeAsNumber: number = Number(runtime);

    const hours: number = Math.floor(runtimeAsNumber / 60);
    const minutes: number = runtimeAsNumber % 60;

    return `${hours}h ${minutes}min`;
  }

  return <div className="movie-information">
    <>
      <span><b>{movie.title}</b> {movie.year ? `(${movie.year})` : ""}</span>
      {movie.runtime ? <span> - {formatRuntime(movie.runtime)}</span> : ""}
    </>
    <div className="movie-information-director">Director: {movie.director}</div>
    <div className="movie-information-actors">Actors: {movie.actors}</div>
  </div>
}