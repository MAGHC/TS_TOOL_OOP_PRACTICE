import { Component } from '../Component.js';

export interface Composable {
  addChild(child: Component<HTMLElement>): void;
}

export class PageItem extends Component<HTMLElement> implements Composable {
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

export class PageComponent extends Component<HTMLUListElement> implements Composable {
  constructor() {
    super('<ul class="page">페이지 컴포넌트</ul>');
  }

  addChild(section: Component<HTMLElement>) {
    const item = new PageItem();
    item.addChild(section);
    item.attachTo(this.el, 'beforeend'); // 맨마지막
  }
}
