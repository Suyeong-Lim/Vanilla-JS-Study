import { TabType } from "./views/TabView.js";

const tag = "[Controller]";

export default class Controller {
  constructor(
    store,
    { searchFormView, searchResultView, tabView, keywordListView }
  ) {
    console.log(tag, "constructor");

    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;
    this.keywordListView = keywordListView;

    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    this.searchFormView
      .on("@submit", (event) => this.search(event.detail.value))
      .on("@reset", () => this.reset());
    this.tabView.on("@change", (e) => this.change(e.detail.value));
  }

  search(keyword) {
    console.log(tag, "search", keyword);

    this.store.search(keyword);
    this.render();
  }

  reset() {
    console.log(tag, "reset");

    this.store.searchKeyword = "";
    this.store.searchResult = [];
    this.render();
  }

  change(tab) {
    console.log(tag, tab);
    this.store.selectedTab = tab;
    this.render();
  }

  render() {
    if (this.store.searchKeyword.length > 0) {
      return this.renderSearchResult();
    }

    this.tabView.show(this.store.selectedTab);
    if (this.store.selectedTab === TabType.KEYWORD) {
      this.keywordListView.show(this.store.getKeywordList());
    } else if (this.store.selectedTab === TabType.HISTORY) {
      console.log("clicked history");
    }
    this.searchResultView.hide();
  }

  renderSearchResult() {
    this.tabView.hide();
    this.searchFormView.show(this.store.searchKeyword);
    this.searchResultView.show(this.store.searchResult);
  }
}
