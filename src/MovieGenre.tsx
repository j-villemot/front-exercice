import { Tag } from 'antd'
import { MouseEventHandler, ReactElement } from 'react'
import './styles/movie-genre.css'

export default function MovieGenre(genres: string[]): ReactElement {
  return (
    <>
      {
        genres.map((genre) => <Tag className="genre-tag" key={genre}><div>{genre}</div></Tag>)
      }
    </>)
}