import SortComponent from "@components/sort/sort";
import {SortTypes, SortTexts} from "@consts";
import {getFilmsBySort} from "@utils/sort";
import {render, RenderPosition, replace} from "@utils/render";

export default class SortController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeSortType = SortTypes.ALL;
    this._sortComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allFilms = this._moviesModel.getFilmsAll();
    const sort = Object.values(SortTypes).map((sortType) => {
      return {
        name: sortType,
        count: getFilmsBySort(allFilms, sortType).length,
        isActive: sortType === this._activeSortType,
        text: SortTexts.get(sortType),
      };
    });
    const oldComponent = this._sortComponent;

    this._sortComponent = new SortComponent(sort);
    this._sortComponent.setSortType(this._activeSortType);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);

    if (oldComponent) {
      replace(this._sortComponent, oldComponent);
      return;
    }

    render(container, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _onSortTypeChange(sortType) {
    this._moviesModel.setSort(sortType);
    this._activeSortType = sortType;
  }

  _onDataChange() {
    this.render();
  }
}
