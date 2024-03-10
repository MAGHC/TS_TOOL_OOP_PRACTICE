export class PageComponent {
    constructor() {
        this.elem = document.createElement('ul');
        this.elem.setAttribute('class', 'page');
        this.elem.textContent = 'This is PageComponent';
    }
    attachTo(parent, position = 'afterbegin') {
        parent.insertAdjacentElement(position, this.elem);
    }
}
