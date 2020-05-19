import {SortType} from "@consts";

const getWatchedFilms = (films) => {
  return films.filter((film) => film.isWatched);
};

const getFilmsInWatchlist = (films) => {
  return films.filter((film) => film.isInWatchlist);
};

const getFavoriteFilms = (films) => {
  return films.filter((film) => film.isFavorite);
};

export const getFilmsBySort = (films, sortType) => {
  switch (sortType) {
    case SortType.FAVORITES:
      return getFavoriteFilms(films);
    case SortType.HISTORY:
      return getWatchedFilms(films);
    case SortType.WATCHLIST:
      return getFilmsInWatchlist(films);
    default:
      return films;
  }
};
