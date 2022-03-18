import { qs } from "../helpers.js";
import View from "./View.js";

const tag = "[SearchFormView]";
export default class SearchFormView extends View {
  constructor() {
    console.log(tag, "constructor");
    super(qs("#search-form-view"));
    this.inputElement = qs("[type=text", this.element);
    this.resetElement = qs("[type=reset]", this.element);
    this.showResetButton(false);
  }

  showResetButton(visible = true) {
    this.resetElement.style.display = visible ? "block" : "none";
  }
}
