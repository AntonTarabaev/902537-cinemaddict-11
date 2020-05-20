export const AUTHORIZATION = `Basic f1dasdf834967dfHJdjsk=`;

export const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

export const HIDDEN_CLASS = `visually-hidden`;

export const SHAKE_ANIMATION_DURATION = 600;

export const MINUTES_IN_HOUR = 60;

export const PAGE_STATUS_OFFLINE = ` [offline]`;

export const EMOJI = {
  ANGRY: `angry`,
  PUKE: `puke`,
  SLEEPING: `sleeping`,
  SMILE: `smile`,
};

export const ALLOWED_COMMENT_LENGTH = {
  MIN: 5,
  MAX: 150,
};

export const DELETE_BUTTON_TEXT = {
  DELETE: `Delete`,
  DELETING: `Deleting...`,
};

export const STORE_NAME = {
  FILMS: `cinemaddict-localstorage-films-v1`,
  COMMENTS: `cinemaddict-localstorage-comments-v1`
};

export const UserRanks = {
  NO_RANK: {
    FILMS_COUNT: 0,
    RANK: ``,
  },
  NOVICE: {
    FILMS_COUNT: 1,
    RANK: `Novice`,
  },
  FAN: {
    FILMS_COUNT: 11,
    RANK: `Fan`
  },
  BUFF: {
    FILMS_COUNT: 21,
    RANK: `Movie Buff`
  }
};

export const FilterTypes = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
  COMMENTS: `comments`,
};

export const SortTypes = {
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

export const FilmButtons = {
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

export const MenuItems = {
  STATISTICS: `stats`,
  REST: `rest`,
};

export const StatisticFilters = {
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
