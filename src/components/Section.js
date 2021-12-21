// Класс для добавления элементов в DOM
export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Добавление элемента в DOM
  addItem(item) {
    const card = this._renderer(item)
    this._container.prepend(card);
  }

  // Рендер карточки
  renderItems(items) {
    items.forEach(item => {
      this.addItem(item);
    })
  }
}