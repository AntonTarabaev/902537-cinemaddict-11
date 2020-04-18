import {FilterType} from "./filter";

export const createFilterTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" data-filter-type="${FilterType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-filter-type="${FilterType.DATE_DOWN}" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-filter-type="${FilterType.RATING_DOWN}" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};
