const TEMPLATE = '<input type="text">';

export default class SearchInput {
  constructor({ $target, onSearch, keywords }) {
    const $searchInput = document.createElement("input");
    const $searchKeywords = document.createElement("section");

    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.";
    this.$searchInput.autofocus = true;

    this.$searchKeywords = $searchKeywords;

    this.keywords = keywords;

    this.template = new Template();
    this.onSearch = onSearch;

    $searchInput.className = "SearchInput";
    $target.appendChild($searchInput);
    $target.appendChild($searchKeywords);

    $searchInput.addEventListener("keyup", (e) => {
      const inputvalue = e.target.value;
      if (e.keyCode === 13) {
        onSearch(inputvalue);
        this.addKeyword(inputvalue);
      }
    });

    $searchInput.addEventListener("click", (e) => {
      if (e.target.value) {
        e.target.value = "";
      }
    });

    this.render();
  }

  addKeyword(keyword) {
    if (this.keywords.length >= 5) {
      this.keywords.shift();
    }
    this.keywords.push(keyword);
    this.render(this.keywords);
  }

  render(data = []) {
    this.$searchKeywords.innerHTML = "";
    if (data) {
      console.log("Alldata", data);
      this.$searchKeywords.innerHTML = this.template.getList(data);

      this.$searchKeywords.querySelectorAll(".keyword").forEach(($item) => {
        $item.addEventListener("click", (e) => {
          const inputKeyword = e.target.dataset.keyword;
          this.onSearch(inputKeyword);
          this.$searchInput.value = inputKeyword;
        });
      });
    }
  }
}

class Template {
  getList(data = []) {
    return `
    <ul>${data
      .map(
        (word, id) =>
          `<li class="keyword" id="${id}" data-keyword="${word}">${word}</li>`
      )
      .join("")}</ul>
    `;
  }
}
