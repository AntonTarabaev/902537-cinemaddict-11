import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import AbstractSmartComponent from "@components/abstract/abstract-smart-component";
import {createStatisticsTemplate} from "./statistics-tpl";
import {StatisticFilter} from "../../consts";

export default class Statistics extends AbstractSmartComponent {
  constructor(moviesModel) {
    super();

    this._moviesModel = moviesModel;

    this._currentFilter = StatisticFilter.ALL_TIME.INPUT;
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
    this._currentFilter = StatisticFilter.ALL_TIME.INPUT;
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
    this._period = Object.values(StatisticFilter)[Object.values(StatisticFilter).findIndex((it) => it.INPUT === this._currentFilter)].DAYS;
  }

  _setChartData() {
    this._chartData = this._moviesModel.getWatchedFilmsCountByGenere(this._period);

    this._chartLabels = this._chartData.map((genere) => genere.name);
    this._chartFilmsCounts = this._chartData.map((genere) => genere.count);
  }

  _renderChart() {
    const BAR_HEIGHT = 50;
    const statisticCtx = document.querySelector(`.statistic__chart`);

    statisticCtx.height = BAR_HEIGHT * this._chartData.length;

    this._chart = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._chartLabels,
        datasets: [{
          data: this._chartFilmsCounts,
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`,
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20,
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 24,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          }],
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        }
      }
    });
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
