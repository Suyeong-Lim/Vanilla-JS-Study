export default class SearchResult {
  $searchResult = null;
  onClick = null;
  data = null;
  loading = false;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;
    this.template = new Template();

    this.render();
  }

  setState(nextData) {
    this.data = nextData.data;
    this.loading = nextData.loading;
    this.render(this.data);
  }

  render(data = []) {
    console.log("?", this.data);

    if (this.loading) {
      console.log("loading");
      this.$searchResult.innerHTML = this.template.getLoading();
    }
    if (!this.loading) {
      console.log("!loading");
    }
    if (!this.loading && data) {
      console.log(data);
      this.$searchResult.innerHTML = this.template.getList(data);
    }
    if (!this.loading && data.length === 0) {
      this.$searchResult.innerHTML = this.template.getEmptyMessage();
    }

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });
    });
  }
}

class Template {
  getInit() {
    return `
    <div>
    고양이를 검색해보세요
    </div> 
    `;
  }
  getLoading() {
    return `
    <div>
     Now Loading...
    </div>
    `;
  }

  getEmptyMessage() {
    return `
      <div>
       검색 결과가 없습니다.
      </div> 
    `;
  }
  getList(data = []) {
    return `
   ${data.map(this._getItem).join("")}
   `;
  }

  _getItem({ id, url, name }) {
    return `
   <article class="item"><img id=${id} src="${url}" alt="${name}"/></article> 
    `;
  }
}
