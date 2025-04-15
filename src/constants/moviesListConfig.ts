import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies
} from '@/services/movies.service';

export const movieListsConfig = {
  top250: {
    title: '250 лучших фильмов:',
    fetcher: getTopRatedMovies
  },
  popular: {
    title: 'Сегодня чаще всего ищут:',
    fetcher: getPopularMovies
  },
  now_playing: {
    title: 'Сейчас в кино:',
    fetcher: getNowPlayingMovies
  }
};
