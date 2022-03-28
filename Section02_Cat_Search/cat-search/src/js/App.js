import api from "./api/catApi.js";
import SearchInput from "./components/SearchInput.js";
import SearchResult from "./components/SearchResult.js";
import ImageInfo from "./components/ImageInfo.js";

export default class App {
  $target = null;
  data = [];

  constructor($target) {
    let keywords = [];
    console.log("App is created!");
    this.$target = $target;
    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        this.setState({
          data: null,
          loading: true,
        });
        api
          .fetchCats(keyword)
          .then(({ data }) => this.setState({ data, loading: false }));
      },
      keywords,
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (image) => {
        this.imageInfo.setState({
          loading: true,
          visible: true,
          image,
        });
        api.fetchCats(id).then(({ data }) =>
          this.imageInfo.setState({
            visible: true,
            loading: false,
            data,
          })
        );
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
