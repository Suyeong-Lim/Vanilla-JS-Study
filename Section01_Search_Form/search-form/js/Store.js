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
  }

  getKeywordList() {
    return this.storage.keywordData;
  }

  getHistoryList() {
    console.log(this.storage.historyData);
    return this.storage.historyData;
  }

  removeHistory(removeKeyword) {
    this.storage.historyData = this.storage.historyData.filter(
      (history) => history.keyword !== removeKeyword.keyword
    );
  }
}
