# 프로그래머스 2020 Dev-Matching : 웹 프론트엔드 과제 풀이 

[고양이 사진 검색 사이트 문제](https://programmers.co.kr/skill_check_assignments/4)

# 풀이 과정 

## 📍 요구사항

**참고** 요구사항의 순서는 난이도와 상관이 없음

### HTML, CSS 관련

-   현재 HTML 코드가 전체적으로 `<div>` 로만 이루어져 있습니다. 이 마크업을 시맨틱한 방법으로 변경해야 합니다.

✅   유저가 사용하는 디바이스의 가로 길이에 따라 검색결과의 row 당 column 갯수를 적절히 변경해주어야 합니다.
    -   992px 이하: 3개
    -   768px 이하: 2개
    -   576px 이하: 1개
    
> media query 사용하여 해결 

```JS
> @media (max-width: 992px) {

.SearchResult {

grid-template-columns: repeat(3, minmax(250px, 1fr));

}}
> ```
 


### 검색 페이지 관련

✅   페이지 진입 시 포커스가 `input` 에 가도록 처리하고, 키워드를 입력한 상태에서 `input` 을 클릭할 시에는 기존에 입력되어 있던 키워드가 삭제되도록 만들어야 합니다.

> 1. autofocus 속성을 true 로 설정한다. 
> 2. 인풋에 click 이벤트가 발생하면 value 를 =" " 로 설정한다. 

```JS
this.$searchInput.autofocus = true;

$searchInput.addEventListener("click", (e) => {
if (e.target.value) {
e.target.value = "";
}});
```


✅   **`필수`** 데이터를 불러오는 중일 때, 현재 데이터를 불러오는 중임을 유저에게 알리는 UI를 추가해야 합니다.
✅   **`필수`** 검색 결과가 없는 경우, 유저가 불편함을 느끼지 않도록 UI적인 적절한 처리가 필요합니다.
> App 에서 api fetch 해올 때 setState에 data와 loading 상태를 전달해서 
> SearchResult 에서 두 값이 있을 때와 없을 때 rendering 되는 UI를 다르게 만들어서 해결


✅  최근 검색한 키워드를 `SearchInput` 아래에 표시되도록 만들고, 해당 영역에 표시된 특정 키워드를 누르면 그 키워드로 검색이 일어나도록 만듭니다. 단, 가장 최근에 검색한 5개의 키워드만 노출되도록 합니다.

> 키워드 배열에 입력값을 저장해서 그 값으로 UI를 만들어서 렌더링했다. 
> 키워드를 누르면 검색이 되도록 하기 위해서 만들어진 UI에 querySelelctorAll로 클릭 이벤트를 달아 준 후 onSearch 함수를 사용하여 검색완료

1️⃣  키워드 입력하기
```JS
$searchInput.addEventListener("keyup", (e) => {

const inputvalue = e.target.value;

if (e.keyCode === 13) {

onSearch(inputvalue);

this.addKeyword(inputvalue);

}
});

```

2️⃣  키워드로 검색일어나도록 만들기 
```JS
this.$searchKeywords.querySelectorAll(".keyword").forEach(($item) => {

$item.addEventListener("click", (e) => {

const inputKeyword = e.target.dataset.keyword;

this.onSearch(inputKeyword);

this.$searchInput.value = inputKeyword;

});

});

```

3️⃣  다섯개의 키워드만 입력할 수 있도록 만들기
5 이상이면 한개씩 shift 해줌
```JS
addKeyword(keyword) {

if (this.keywords.length >= 5) {

this.keywords.shift();

} }
```