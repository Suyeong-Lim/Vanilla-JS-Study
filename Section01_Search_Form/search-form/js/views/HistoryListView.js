import KeywordListView from "./KeywordListView.js";
import { qs, delegate, formatRelativeDate } from "../helpers.js";

export default class HistoryListView extends KeywordListView {
  constructor() {
    super(qs("#history-list-view"), new Template());
  }

  bindEvents() {
    delegate(this.element, "click", "button.btn-remove", (e) =>
      this.handleClickRemoveBtn(e)
    );
    super.bindEvents();
  }

  handleClickRemoveBtn(e) {
    e.stopPropagation();
    const value = e.target.parentElement.dataset.keyword;
    this.emit("@remove", { value });
  }
}

class Template {
  getEmptyMessage() {
    return `
    <div class="empty-box">
        최근 검색어가 없습니다.
    </div>`;
  }
  getList(data) {
    return `<ul class="list">${data.map(this._getItem).join("")}</ul>`;
  }

  _getItem({ id, keyword, date }) {
    return `
     <li data-keyword="${keyword}">
        ${keyword}
        <span class="date">${formatRelativeDate(date)}</span>
         <button class="btn-remove"></button>
      </li>
   
      `;
  }
}
