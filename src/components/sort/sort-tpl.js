import {SortType} from "@consts";

const createSortMarkup = (sort) => {
  const {name, count, isActive, text} = sort;

  const activeClass = `main-navigation__item--active`;
  return (
    `<a href="#${name}" data-sort-type="${name}" class="main-navigation__item ${isActive ? activeClass : ``}">${text} ${name === SortType.ALL ? `` : `<span class="main-navigation__item-count">${count}</span>`}</a>`
  );
};

export const createSortTemplate = (sort) => {
  const sortMarkup = sort.map((it) => createSortMarkup(it)).join(`\n`);

  return (
    `<div class="main-navigation__items">
      ${sortMarkup}
    </div>`
  );
};
