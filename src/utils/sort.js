import {SortTypes} from "@consts";

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
    case SortTypes.FAVORITES:
      return getFavoriteFilms(films);
    case SortTypes.HISTORY:
      return getWatchedFilms(films);
    case SortTypes.WATCHLIST:
      return getFilmsInWatchlist(films);
    default:
      return films;
  }
};
