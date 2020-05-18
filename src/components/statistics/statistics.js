import AbstractSmartComponent from "@components/abstract/abstract-smart-component";
import {createStatisticsTemplate} from "./statistics-tpl";

export default class SiteMenu extends AbstractSmartComponent {
  getTemplate() {
    return createStatisticsTemplate();
  }
}
