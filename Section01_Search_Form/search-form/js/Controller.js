import { TabType } from "./views/TabView.js";

const tag = "[Controller]";

export default class Controller {
  constructor(
    store,
    {
      searchFormView,
      searchResultView,
      tabView,
      keywordListView,
      historyListView,
    }
  ) {
    console.log(tag, "constructor");

    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;
    this.keywordListView = keywordListView;
    this.historyListView = historyListView;

    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    this.searchFormView
      .on("@submit", (event) => this.search(event.detail.value))
      .on("@reset", () => this.reset());
    this.tabView.on("@change", (e) => this.change(e.detail.value));
    this.keywordListView.on("@click", (e) => this.search(e.detail.value));
    this.historyListView
      .on("@remove", (e) => this.removeHistory(e.detail.value))
      .on("@click", (e) => this.search(e.detail.value));
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

  removeHistory(keyword) {
    console.log(keyword);
    this.store.removeHistory(keyword);
    this.render();
  }

  render() {
    if (this.store.searchKeyword.length > 0) {
      return this.renderSearchResult();
    }

    this.tabView.show(this.store.selectedTab);
    if (this.store.selectedTab === TabType.KEYWORD) {
      this.keywordListView.show(this.store.getKeywordList());
      this.historyListView.hide();
    } else if (this.store.selectedTab === TabType.HISTORY) {
      this.historyListView.show(this.store.getHistoryList());
      this.keywordListView.hide();
    } else {
      throw "impossible Condition";
    }
    this.searchResultView.hide();
  }

  renderSearchResult() {
    this.searchFormView.show(this.store.searchKeyword);
    this.searchResultView.show(this.store.searchResult);
    this.tabView.hide();
    this.keywordListView.hide();
    this.historyListView.hide();
  }
}
