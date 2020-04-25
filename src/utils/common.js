import moment from "moment";

export const formatTime = (durationInMinutes) => {
  return moment.utc().startOf(`day`).add({minutes: durationInMinutes}).format(`${durationInMinutes > 60 ? `h[h]` : ``} mm[m]`);
};

export const calculateFilmsCountByFilter = (films, filterName) => {
  let filmsCount = 0;

  switch (filterName) {
    case `watchlist`:
      filmsCount = films.reduce((acc, film) => acc + (film.isInWatchlist ? 1 : 0), 0);
      break;
    case `history`:
      filmsCount = films.reduce((acc, film) => acc + (film.isWatched ? 1 : 0), 0);
      break;
    case `favorites`:
      filmsCount = films.reduce((acc, film) => acc + (film.isFavorite ? 1 : 0), 0);
      break;
  }

  return filmsCount;
};

export const isEscPressed = (evt) => evt.key === `Escape` || evt.key === `Esc`;
