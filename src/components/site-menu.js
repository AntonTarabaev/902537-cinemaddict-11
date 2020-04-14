const calculateFilmsCountByFilter = (films, filterName) => {
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

export const createSiteMenuTemplate = (films) => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${calculateFilmsCountByFilter(films, `watchlist`)}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${calculateFilmsCountByFilter(films, `history`)}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${calculateFilmsCountByFilter(films, `favorites`)}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};
