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
    console.log(this.storage.keywordData);
    return this.storage.keywordData;
  }
}
