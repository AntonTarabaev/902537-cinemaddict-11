export const HIDDEN_CLASS = `visually-hidden`;

export const SHAKE_ANIMATION_DURATION = 600;

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

export const FilmButton = {
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

export const MenuItem = {
  STATISTICS: `stats`,
  REST: `rest`,
};

export const AllowedCommentTextLength = {
  MIN: 5,
  MAX: 150,
};

export const DeleteButtonText = {
  DELETE: `Delete`,
  DELETING: `Deleting...`,
};
