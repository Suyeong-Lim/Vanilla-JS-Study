import { createNextId } from "./helpers.js";
import { TabType } from "./views/TabView.js";

const tag = "[store]";

export default class Store {
  constructor(storage) {
    console.log(tag, "store");
    if (!storage) throw "no storage";
    this.storage = storage;
    this.searchKeyword = "";
    this.searchResult = [];
    this.selectedTab = TabType.KEYWORD;
  }

  search(keyword) {
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData.filter((it) =>
      it.name.includes(keyword)
    );
    this.addHistory(keyword);
  }

  getKeywordList() {
    return this.storage.keywordData;
  }

  getHistoryList() {
    console.log(this.storage.historyData);
    return this.storage.historyData.sort(this._sortHistory);
  }

  _sortHistory(history1, history2) {
    return history2.date > history1.date;
  }

  removeHistory(removeKeyword) {
    this.storage.historyData = this.storage.historyData.filter(
      (history) => history.keyword !== removeKeyword
    );
  }

  addHistory(keyword) {
    console.log(keyword.trim());
    if (!keyword) return;
    const hasHistory = this.storage.historyData.some(
      (history) => history.keyword === keyword
    );
    if (hasHistory) this.removeHistory(keyword);
    const date = new Date();
    const id = createNextId(this.storage.historyData);
    this.storage.historyData.push({ id, keyword, date });
    this.storage.historyData = this.storage.historyData.sort(this._sortHistory);
  }
}
