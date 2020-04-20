export const formatTime = (durationInMinutes) => {
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes - hours * 60;

  return `${hours > 0 ? `${hours}h ` : ``}${minutes}m`;
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