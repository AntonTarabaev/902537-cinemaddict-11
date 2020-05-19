import {getHours, getMinutes} from "@utils/common";
import {StatisticFilter} from "@consts";

const createStatisticFilter = (input, label, currentFilter) => {
  const checkedProperty = input === currentFilter ? `checked` : ``;

  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${input}" value="${input}" ${checkedProperty}>
    <label for="statistic-${input}" class="statistic__filters-label">${label}</label>`
  );
};

const createStatisticFilters = (currentFilter) => Object.values(StatisticFilter).map((it) => createStatisticFilter(it.INPUT, it.LABEL, currentFilter)).join(`\n`);

export const createStatisticsTemplate = ({rank, count, duration, topGenre}, currentFilter) => {
  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${rank}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        ${createStatisticFilters(currentFilter)}
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${count} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${getHours(duration)} <span class="statistic__item-description">h</span> ${getMinutes(duration)} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};
