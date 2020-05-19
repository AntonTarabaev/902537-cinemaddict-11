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

export const StatisticFilter = {
  ALL_TIME: {
    INPUT: `all-time`,
    LABEL: `All time`,
    DAYS: 0,
  },
  TODAY: {
    INPUT: `today`,
    LABEL: `Today`,
    DAYS: 1,
  },
  WEEK: {
    INPUT: `week`,
    LABEL: `Week`,
    DAYS: 7,
  },
  MONTH: {
    INPUT: `month`,
    LABEL: `Month`,
    DAYS: 30,
  },
  YEAR: {
    INPUT: `year`,
    LABEL: `Year`,
    DAYS: 365,
  },
};
