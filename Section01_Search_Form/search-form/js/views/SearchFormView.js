import { qs, on } from "../helpers.js";
import View from "./View.js";

const tag = "[SearchFormView]";
export default class SearchFormView extends View {
  constructor() {
    console.log(tag, "constructor");
    super(qs("#search-form-view"));
    this.inputElement = qs("[type=text]", this.element);
    this.resetElement = qs("[type=reset]", this.element);
    this.showResetButton(false);
    this.bindEvents(); //이벤트 바인딩역할을 하는 메서드
  }

  showResetButton(visible = true) {
    this.resetElement.style.display = visible ? "block" : "none";
  }

  bindEvents() {
    on(this.inputElement, "keyup", () => this.handleKeyUp());
    this.on("submit", (e) => this.handleSubmit(e));
    on(this.resetElement, "click", () => this.handleReset());
  }

  handleKeyUp() {
    const { value } = this.inputElement;
    this.showResetButton(value.length > 0);
    if (value.length <= 0) {
      this.emit("@reset");
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("handleSubmit");
    const { value } = this.inputElement;
    this.emit("@submit", { value });
  }

  handleReset() {
    this.emit("@reset");
  }
}
