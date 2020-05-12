export const FILMS_TOTAL_COUNT = 12;

export const EMOJI = {
  ANGRY: `angry`,
  PUKE: `puke`,
  SLEEPING: `sleeping`,
  SMILE: `smile`,
};

export const FilterType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
  COMMENTS: `comments`,
};

export const SortType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

export const SortTexts = new Map([
  [`all`, `All movies`],
  [`watchlist`, `Watchlist`],
  [`history`, `History`],
  [`favorites`, `Favorites`],
]);
