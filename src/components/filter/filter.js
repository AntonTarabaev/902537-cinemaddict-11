import AbstractComponent from "../abstract-component";
import {createFilterTemplate} from "./filter-tpl";

export const FilterType = {
  DEFAULT: `default`,
  DATE_UP: `date-up`,
  DATE_DOWN: `date-down`,
  RATING_UP: `rating-up`,
  RATING_DOWN: `rating-down`,
};

export default class Filter extends AbstractComponent {
  constructor() {
    super();

    this._currentFilterType = FilterType.DEFAULT;
  }

  getTemplate() {
    return createFilterTemplate();
  }

  getFilterType() {
    return this._currentFilterType;
  }

  setFilterTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const filterType = evt.target.dataset.filterType;

      if (this._currentFilterType === filterType === FilterType.DEFAULT) {
        return;
      }

      if (this._currentFilterType === filterType) {
        if (filterType === FilterType.DATE_DOWN) {
          this._currentFilterType = FilterType.DATE_UP;
        } else if (filterType === FilterType.RATING_DOWN) {
          this._currentFilterType = FilterType.RATING_UP;
        }
      } else {
        this.getElement().querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);
        evt.target.classList.add(`sort__button--active`);
        this._currentFilterType = filterType;
      }

      handler(this._currentFilterType);
    });
  }
}
