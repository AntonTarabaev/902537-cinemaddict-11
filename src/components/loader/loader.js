import AbstractComponent from "@components/abstract/abstract-component";
import {createLoaderTemplate} from "./loader-tpl";

export default class Loader extends AbstractComponent {
  getTemplate() {
    return createLoaderTemplate();
  }
}
