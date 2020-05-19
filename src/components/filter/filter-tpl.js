import {FilterTypes} from "@consts";

export const createFilterTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" data-filter-type="${FilterTypes.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-filter-type="${FilterTypes.DATE}" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-filter-type="${FilterTypes.RATING}" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};
