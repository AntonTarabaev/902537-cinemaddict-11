import MovieController from "../movie";
import {FilterType} from "../../components/filter/filter";

export const renderFilmsCards = (container, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movieController = new MovieController(container, onDataChange, onViewChange);

    movieController.render(film);

    return movieController;
  });
};

export const getFilteredFilms = (films, filterType, from, to) => {
  let filteredFilms = [];

  switch (filterType) {
    case FilterType.DATE_DOWN:
      filteredFilms = films.slice().sort((a, b) => b.releaseDate - a.releaseDate);
      break;
    case FilterType.DATE_UP:
      filteredFilms = films.slice().sort((a, b) => a.releaseDate - b.releaseDate);
      break;
    case FilterType.RATING_DOWN:
      filteredFilms = films.slice().sort((a, b) => b.rating - a.rating);
      break;
    case FilterType.RATING_UP:
      filteredFilms = films.slice().sort((a, b) => a.rating - b.rating);
      break;
    case FilterType.DEFAULT:
      filteredFilms = films;
      break;
  }

  return filteredFilms.slice(from, to);
};
