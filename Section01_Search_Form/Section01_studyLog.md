# 만들고 비교하며 학습하는 리액트

## 📍 Why

간단한 JS 공부를 마친 후 React 프레임워크로 프론트엔드 공부를 시작하게 되었다.
한참을 React 공부를 하던 중, 프로그래머스 데브 매칭을 알게되었고 Vanilla JS 로만 구현하는 과제를 보고
Vanilla JS 가 React 보다 쉬울것이라 단단히 오해를 한 채 과제를 열었지만 왠걸.. MVC 패턴을 JS 로 구현하는 것에 대해 하나도 모르고 있었다는 것을 깨달았다.

예전에 강의를 듣긴했지만 코드를 클론해서 진행했던 (거의 못알아들었던..) 강의가 생각이 났고 이 강의를 다시한번 복습하면서 JS 로 MVC 패턴 구현을 다시한번 공부해야겠다는 다짐을 하게되었다.
이번에는 클론 후 진행하는 것이 아니라 초기셋팅부터 차근차근 공부해 나갈 예정이다.

---

### 실습 환경 구성하기

`npx lite-server --baseDir 폴더명`
Webpack, Babel 없이 구현하여 type=module 을 사용한다.
type=module 만 사용하면 CORS 에러가 나는데, lite-server를 사용하면 CORS 없이 개발서버를 띄워준다. (--baseDir 폴더명 을 설정해주면 폴더명을 기준으로 lite-server를 띄워준다.)

### 폴더구조

![folderStructure](./README.assets/folder-structure.png)

- Model

  - storage - 데이터를 저장하고있는 파일로 상품목록, 검색기록 객체
  - Store - storage 를 받아서 값이 없으면 예외처리 하고 , 있으면 내부 변수로 storage를 저장한다. MVC 패턴에서 Model의 역할을 한다.

- View : 사용자가 볼 수 있는 화면을 관리한다.

  - views - View들을 담는 폴더로 모든 View 들이 공통으로 사용하는 부모 View class 파일을 가진다.
  - View - Dom API를 직접적으로 사용하며 관리할 element를 인자로 받아서 관리한다.
  - helpers - Dom API를 직접쓰지 않고 편하게 쓰기 위해 wrapping 해놓은것

    helpers 의 주요 함수들

    1. query Select 함수 qs
    2. querySelectorAll 함수 qsAll
    3. addEvent 함수 on
    4. 상대시간 계산 함수 formatRelativeDate
    5. 지난날짜 계산 함수
    6. 숫자를 올려가면서 아이디를 만들어주는 함수

- Controller
  - controller - 생성 시점에 store 와 view 를 받아서 둘다 저장한다. (스토어와 뷰를 관리하는 역할을 한다.)
