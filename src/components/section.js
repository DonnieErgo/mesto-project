export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  addItem(item) {
    document.querySelector(this._containerSelector).prepend(item);
  }

  renderItems() {
    if (Array.isArray(this._items)) {
      this._items.forEach(item => {
        this._renderer(item);
      })
    }
    else {
      this._renderer(this._items)
    }
  }
}