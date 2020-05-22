import AbstractSmartComponent from "@components/abstract/abstract-smart-component";
import {createStatisticsTemplate} from "./statistics-tpl";
import {renderStatisticsChart} from "./statistics-chart";
import {StatisticFilters} from "../../consts";

export default class Statistics extends AbstractSmartComponent {
  constructor(moviesModel) {
    super();

    this._moviesModel = moviesModel;

    this._currentFilter = StatisticFilters.ALL_TIME.INPUT;
    this._period = 0;
    this._chart = null;
    this._chartData = [];
    this._chartLabels = [];
    this._chartFilmsCounts = [];
  }

  getTemplate() {
    return createStatisticsTemplate(this._moviesModel.getStatistic(this._period), this._currentFilter);
  }

  show() {
    this._currentFilter = StatisticFilters.ALL_TIME.INPUT;
    this._getFilterPeriod();
    this.rerender();

    super.show();
  }

  rerender() {
    super.rerender();

    this._setChartData();
    this._renderChart();
  }

  recoveryListeners() {
    this._setFilterChangeHandlers();
  }

  _getFilterPeriod() {
    this._period = Object.values(StatisticFilters)[Object.values(StatisticFilters).findIndex((it) => it.INPUT === this._currentFilter)].DAYS;
  }

  _setChartData() {
    this._chartData = this._moviesModel.getWatchedFilmsCountByGenere(this._period);

    this._chartLabels = this._chartData.map((genere) => genere.name);
    this._chartFilmsCounts = this._chartData.map((genere) => genere.count);
  }

  _renderChart() {
    this._chart = renderStatisticsChart(this._chartData, this._chartLabels, this._chartFilmsCounts);
  }

  _setFilterChangeHandlers() {
    this.getElement().querySelectorAll(`.statistic__filters-input`).forEach((it) => {
      it.addEventListener(`change`, (evt) => {
        this._currentFilter = evt.target.value;
        this._getFilterPeriod();
        this.rerender();
      });
    });
  }
}
