// Интерфейс для одного фильма
export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genres: Genre[];
  id: string;
  original_language: string;
  original_title: string;
  runtime: number;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// Интерфейс для ответа API
export interface APIMovie extends Omit<Movie, 'genres' | 'runtime'> {
  genre_ids: number[];
}

export interface MoviesList {
  page: number;
  results: APIMovie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Trailer {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: 'YouTube';
  size: 720 | 1080 | 2160;
  type: 'Trailer' | 'Teaser' | 'Featurette' | 'Clip';
  official: boolean;
  published_at: string;
  id: string;
}

export interface TrailersList {
  id: number;
  results: Trailer[];
}
