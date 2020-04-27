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
    case FilterType.DATE:
      filteredFilms = films.slice().sort((a, b) => b.releaseDate - a.releaseDate);
      break;
    case FilterType.RATING:
      filteredFilms = films.slice().sort((a, b) => b.rating - a.rating);
      break;
    case FilterType.DEFAULT:
      filteredFilms = films;
      break;
  }

  return filteredFilms.slice(from, to);
};
