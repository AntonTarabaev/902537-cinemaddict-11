import {SortType} from "@consts";
import {getWatchedFilmsByPeriod} from "@utils/common";
import {getFilmsBySort} from "@utils/sort";
import {getUserRank} from "@utils/common";

export default class Movies {
  constructor() {
    this._films = [];
    this._activeSortType = SortType.ALL;

    this._dataChangeHandlers = [];
    this._sortChangeHandlers = [];
  }

  getFilms() {
    return getFilmsBySort(this._films, this._activeSortType);
  }

  getFilmsAll() {
    return this._films;
  }

  setFilms(films) {
    this._films = Array.from(films);
    this._callHandlers(this._dataChangeHandlers);
  }

  setSort(sortType) {
    this._activeSortType = sortType;
    this._callHandlers(this._sortChangeHandlers);
  }

  updateFilm(id, film) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  getStatistic(period) {
    if (this._films.length === 0) {
      return this._getZeroStatistics();
    }

    return this._getWatchedStatistics(getWatchedFilmsByPeriod(this._films, period), period);
  }

  getWatchedFilmsCountByGenere(period) {
    const films = getWatchedFilmsByPeriod(this._films, period);

    const filmCountsByGene = this._getWatchedFilmsGeneres(films).map((genre) => {
      return {
        name: genre,
        count: films.filter((film) => film.genres.includes(genre)).length,
      };
    });

    return filmCountsByGene.sort((a, b) => b.count - a.count);
  }

  _getWatchedStatistics(films, period) {
    const topGenre = this.getWatchedFilmsCountByGenere(period)[0];
    return {
      rank: getUserRank(getWatchedFilmsByPeriod(this._films, 0).length),
      count: films.length,
      duration: this._getWatchedFilmsDuration(films),
      topGenre: topGenre ? topGenre.name : ``,
    };
  }

  _getZeroStatistics() {
    return {
      rank: ``,
      count: 0,
      duration: 0,
      topGenre: ``,
    };
  }

  _getWatchedFilmsDuration(watchedFilms) {
    return watchedFilms.reduce((duration, it) => {
      return duration + it.duration;
    }, 0);
  }

  _getWatchedFilmsGeneres(films) {
    const genres = [];

    films.map((film) => {
      film.genres.map((genre) => {
        if (!genres.includes(genre)) {
          genres.push(genre);
        }
      });
    });

    return genres;
  }

  setSortChangeHandler(handler) {
    this._sortChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
