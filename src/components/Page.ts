export class PageComponent {
  private elem: HTMLUListElement;

  constructor() {
    this.elem = document.createElement('ul');
    this.elem.setAttribute('class', 'page');
    this.elem.textContent = 'This is PageComponent';
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.elem);
  }
}
