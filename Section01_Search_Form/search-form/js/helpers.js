//querySelector 함수 (selector,찾을 root엘레먼트)
export function qs(selector, scope = document) {
  if (!selector) throw "no selector";
  return scope.querySelector(selector);
}

export function qsAll(selector, scope = document) {
  if (!selector) throw "no selector";
  return Array.from(scope.querySelectorAll(selector));
}

//이벤트를 실행해주는 함수
export function on(target, eventName, handler) {
  target.addEventListner(eventName, handler);
}

//Date를 받아서 상대시간을 계산하는 함수
export function formatRelativeDate(date = new Date()) {
  const TEN_SECOND = 10 * 1000;
  const A_MINUTE = 60 * 1000;
  const A_HOUR = 60 * A_MINUTE;
  const A_DAY = 24 * A_HOUR;

  const diff = new Date() - date;

  if (diff < TEN_SECOND) return `방금 전`;
  if (diff < A_MINUTE) return `${Math.floor(diff / 1000)}초 전`;
  if (diff < A_HOUR) return `${Math.floor(diff / 1000 / 60)}분 전`;
  if (diff < A_DAY) return `${Math.floor(diff / 1000 / 60 / 24)}시간 전`;
  return date.toLocaleString("ko-KR", {
    hour12: false,
    dateStyle: "medium",
  });
}

export function createPastDate(date = 1, now = new Date()) {
  if (date < 1) throw "date 는 1 이상입니다.";

  const yesterday = new Date(now.setDate(now.getDate() - 1));
  if (date === 1) return yesterday;

  return createPastDate(date - 1, yesterday);
}

//list 로 받은 것들 중 가장 마지막 아이디를 가진 것에서 +1을 반환하는 함수
export function createNextId(list = []) {
  return Math.max(...list.map((item) => item.id)) + 1;
}
