export interface Movie {
  title: string;
  original_title: string;
  release_date: string;
  genre_ids: [number];
  overview: string;
  poster_path: string;
  backdrop_path: string;
}

export interface GenreMap {
  [key: string]: string;
}
