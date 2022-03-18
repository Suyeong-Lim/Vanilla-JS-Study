import Store from "./Store";
import storage from "./storage";

function main() {
  const store = new Store(Storage);
  const Views = {};
  new Controller(store, Views);
}
