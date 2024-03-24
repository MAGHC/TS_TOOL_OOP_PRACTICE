import { Component } from '../Component.js';

export class PageComponent extends Component<HTMLUListElement> {
  constructor() {
    super('<ul class="page">페이지 컴포넌트</ul>');
  }
}

export class PageItem extends Component<HTMLElement> {
  constructor() {
    super(`<li class="page-item">
    <section class="page-item_body"></section>
    <div class="page-itme_controls">
      <button class="close">X</button>
    </div>
  </li>
  `);
  }

  addChild(child: Component<HTMLElement>) {
    const pageItemBody = this.el.querySelector('.page-itme_body')! as HTMLElement;

    child.attachTo(pageItemBody);
  }
}
