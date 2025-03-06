import { MovieApi } from './types/MovieApi'
import { ReactElement } from 'react'
import { Rate } from 'antd'
import './styles/movie-rating-and-poster.css'

export default function MoviePosterAndRating(movie: MovieApi): ReactElement {
  return <div className="rating-and-poster">
    <img className="poster" src={movie.posterUrl} alt={`${movie.title} poster`} />
    <div className="rating">
      <Rate disabled allowHalf value={movie.rating / 2}></Rate>
      ({movie.rating})
    </div>
  </div>
}