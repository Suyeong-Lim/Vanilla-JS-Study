import { qs, on } from "../helpers.js";
import View from "./View.js";

export default class SearchResultView extends View {
  constructor() {
    super(qs("#search-result-view"));
    this.template = new Template();
  }

  //데이터에 따라서 검색결과를 보여준다
  //데이터에 따라서 돔을 동적으로 보여줘야한다.
  show(data = []) {
    this.element.innerHTML =
      data.length > 0
        ? this.template.getList(data)
        : this.template.getEmptyMessage();
    super.show(); //부모의 메서드를 호출해서 실제 화면에 노출되도록.
  }
}

class Template {
  getEmptyMessage() {
    return `
      <div class="empty-box">
        검색결과가 없습니다.
      </div>
    `;
  }
  getList(data = []) {
    return `
      <ul class="result">
          ${data.map(this._getItem).join("")}
      </ul>
    `;
  }

  //❓
  _getItem({ imageUrl, name }) {
    return `
      <li>
        <img src="${imageUrl}" alt="${name}">
        <p>${name}</p>
      </li>  
    `;
  }
}
