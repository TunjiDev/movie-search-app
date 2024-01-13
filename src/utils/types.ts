export interface MovieType {
  id?: number;
  name: string;
  title: string;
  original_title: string;
  release_date: string;
  first_air_date: string;
  genre_ids: [number];
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
}

export interface GenreMap {
  [key: string]: string;
}
