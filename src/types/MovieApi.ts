export interface MovieApi {
  id: number;
  title: string;
  rating: number;
  year: string;
  runtime: string;
  genres: string[];
  director: string;
  actors: string;
  plot: string;
  posterUrl: string;
}