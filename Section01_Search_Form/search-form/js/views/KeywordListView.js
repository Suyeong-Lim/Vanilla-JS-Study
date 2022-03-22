import View from "./View.js";
import { qs } from "../helpers.js";

const tag = "[KeywordListView]";

export default class KeywordListView extends View {
  constructor() {
    console.log(tag, "KeywordListView");
    super(qs("#keyword-list-view"));
    this.template = new Template();
  }
  show(data = []) {
    this.element.innerHTML =
      data.length > 0
        ? this.template.getList(data)
        : this.template.getEmptyMessage();
    super.show();
  }
}

class Template {
  getEmptyMessage() {
    return `추천 검색어가 없습니다`;
  }
  getList(data) {
    return `
         <ul class="list">${data.map(this._getItem).join("")}</ul>
      `;
  }
  _getItem({ keyword, id }) {
    return `
    <li data-keyword="${keyword}">
        <span class="number">${id}</span>
        ${keyword}
    </li>`;
  }
}
