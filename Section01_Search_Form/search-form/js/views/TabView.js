import { qs, on } from "../helpers.js";
import View from "./View.js";

const tag = "[tabView]";

const TabLabel = {
  KEYWORD: "추천 검색어",
  HISTORY: "최근 검색어",
};

export default class TabView extends View {
  constructor() {
    console.log(tag, "tabView");
    super(qs("#tab-view"));
    this.template = new Template();
  }
  show() {
    this.element.innerHTML = this.template.getTabList();
    super.show();
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
