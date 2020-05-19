import {FilterType} from "@consts";

export const getFilteredFilms = (films, filterType, from, to) => {
  let filteredFilms = [];

  switch (filterType) {
    case FilterType.DATE:
      filteredFilms = films.slice().sort((a, b) => b.releaseDate - a.releaseDate);
      break;
    case FilterType.RATING:
      filteredFilms = films.slice().sort((a, b) => b.rating - a.rating);
      break;
    case FilterType.COMMENTS:
      filteredFilms = films.slice().sort((a, b) => b.commentsCount - a.commentsCount);
      break;
    case FilterType.DEFAULT:
      filteredFilms = films;
      break;
  }

  return filteredFilms.slice(from, to);
};
