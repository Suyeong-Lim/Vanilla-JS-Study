import { qs, on, qsAll, delegate } from "../helpers.js";
import View from "./View.js";

const tag = "[tabView]";

export const TabType = {
  KEYWORD: "KEYWORD",
  HISTORY: "HISTORY",
};

const TabLabel = {
  KEYWORD: "추천 검색어",
  HISTORY: "최근 검색어",
};

export default class TabView extends View {
  constructor() {
    console.log(tag, "tabView");
    super(qs("#tab-view"));
    this.template = new Template();
    this.bindEvents();
  }

  show(selectedTab) {
    this.element.innerHTML = this.template.getTabList();
    super.show();
    qsAll("li", this.element).forEach((li) => {
      li.className = li.dataset.tab === selectedTab ? "active" : "";
    });
  }
  bindEvents() {
    delegate(this.element, "click", "li", (e) => this.handleClick(e));
  }
  handleClick(e) {
    const value = e.target.dataset.tab;
    this.emit("@change", { value });
  }
}

class Template {
  getTabList() {
    return `
           <ul class="tabs">
           ${Object.entries(TabLabel)
             .map((it) => {
               const [tabType, tabLabel] = it;
               return { tabType, tabLabel };
             })
             .map(this._getTab)
             .join("")}
           </ul>
        `;
  }
  _getTab({ tabType, tabLabel }) {
    return `
      <li data-tab="${tabType}">${tabLabel}</li>
     `;
  }
}
