import View from "./View.js";
import { qs, on, delegate } from "../helpers.js";

export default class HistoryView extends View {
  constructor() {
    super(qs("#history-list-view"));
    this.template = new Template();
    this.bindEvents();
  }
  show(data = []) {
    this.element.innerHTML =
      data.length > 0
        ? this.template.getList(data)
        : this.template.getEmptyMessate();
    super.show();
  }

  bindEvents() {
    delegate(this.element, "click", "button.btn-remove", (e) =>
      this.handleClickRemoveBtn(e)
    );
  }
  handleClickRemoveBtn(e) {
    const value = e.target.parentElement.dataset;
    this.emit("@remove", { value });
  }
}

class Template {
  getEmptyMessate() {
    return `
    <div class="empty-box">
        최근 검색어가 없습니다.
    </div>`;
  }
  getList(data) {
    return `<ul class="list">${data.map(this._getItem).join("")}</ul>`;
  }

  _getItem({ id, keyword, date }) {
    const formattedDate = date.toLocaleString("ko-KR", {
      hour12: false,
      dateStyle: "short",
      timeStyle: "medium",
    });
    return `
     <li data-keyword="${keyword}">
        ${keyword}
        <span class="date">${formattedDate}</span>
         <button class="btn-remove"></button>
      </li>
   
      `;
  }
}
