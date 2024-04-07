import { Component } from '../Component.js';

export interface Composable {
  addChild(child: Component<HTMLElement>): void;
}

type SectionContainerConstructor = {
  new (): SectionContainer;
  // 아무것도안받는 생성자인데 색션컨테이너를 만드는 어떤 생성자라도 상관없음
};

type OnCloseListener = () => void;

interface SectionContainer extends Component<HTMLElement>, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
}

export class PageItem extends Component<HTMLElement> implements SectionContainer {
  private closeListener?: OnCloseListener;

  constructor() {
    super(`<li class="page-item">
    <section class="page-itme_body"></section>
    <div class="page-itme_controls">
      <button class="close">X</button>
    </div>
  </li>
  `);

    const closeBtn = this.el.querySelector('.close')! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
  }

  addChild(child: Component<HTMLElement>) {
    const pageItemBody = this.el.querySelector('.page-itme_body')! as HTMLElement;

    child.attachTo(pageItemBody);
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
}

export class PageComponent extends Component<HTMLUListElement> implements Composable {
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super('<ul class="page"></ul>');
  }

  addChild(section: Component<HTMLElement>) {
    const item = new this.pageItemConstructor();
    item.addChild(section);
    item.attachTo(this.el, 'beforeend'); // 맨마지막
    item.setOnCloseListener(() => {
      item.removeFrom(this.el);
    });
  }
}
