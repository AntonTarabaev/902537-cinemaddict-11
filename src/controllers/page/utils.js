import {FilterTypes} from "@consts";

export const getFilteredFilms = (films, filterType, from, to) => {
  let filteredFilms = [];

  switch (filterType) {
    case FilterTypes.DATE:
      filteredFilms = films.slice().sort((a, b) => b.releaseDate - a.releaseDate);
      break;
    case FilterTypes.RATING:
      filteredFilms = films.slice().sort((a, b) => b.rating - a.rating);
      break;
    case FilterTypes.COMMENTS:
      filteredFilms = films.slice().sort((a, b) => b.commentsCount - a.commentsCount);
      break;
    case FilterTypes.DEFAULT:
      filteredFilms = films;
      break;
  }

  return filteredFilms.slice(from, to);
};
