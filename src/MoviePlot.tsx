import { ReactElement } from 'react'
import './styles/movie-plot.css'

export default function MoviePlot(plot: string): ReactElement {
  return <p className="movie-plot">{plot}</p>
}