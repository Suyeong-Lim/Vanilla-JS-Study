const tag = "[View]";

export default class View {
  constructor(element) {
    if (!element) throw "no element";

    this.element = element;
    return this;
  }
}
