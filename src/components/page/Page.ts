import { Component, ComponentInterface } from '../Component.js';

export interface Composable {
  addChild(child: ComponentInterface): void;
}

type SectionContainerConstructor = {
  new (): SectionContainer;
  // 아무것도안받는 생성자인데 색션컨테이너를 만드는 어떤 생성자라도 상관없음
};

type OnDragStateListener<T extends ComponentInterface> = (target: T, state: DragState) => void;
type DragState = 'start' | 'end' | 'leave' | 'enter';
type OnCloseListener = () => void;

interface SectionContainer extends Component<HTMLElement>, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
  setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void;
}

export class PageItem extends Component<HTMLElement> implements SectionContainer {
  private closeListener?: OnCloseListener;

  private dragStateListener?: OnDragStateListener<PageItem>;

  constructor() {
    super(`<li draggable="true" class="page-item">
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

    this.el.addEventListener('dragstart', (e: DragEvent) => {
      this.onDragStart(e);
    });
    this.el.addEventListener('dragend', (e: DragEvent) => {
      this.onDragEnd(e);
    });

    this.el.addEventListener('dragenter', (e: DragEvent) => {
      this.onDragStart(e);
    });
    this.el.addEventListener('dragleave', (e: DragEvent) => {
      this.onDragEnd(e);
    });
  }

  onDragStart(_: DragEvent) {
    //_로 안쓴다고 알릴수있음ㄴ
    this.notifyDragObservers('start');
  }

  onDragEnd(_: DragEvent) {
    this.notifyDragObservers('end');
  }

  onDragEnter(_: DragEvent) {
    this.notifyDragObservers('enter');
  }

  onDragLeave(_: DragEvent) {
    this.notifyDragObservers('leave');
  }

  notifyDragObservers(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
  }

  addChild(child: Component<HTMLElement>) {
    const pageItemBody = this.el.querySelector('.page-itme_body')! as HTMLElement;

    child.attachTo(pageItemBody);
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }

  setOnDragStateListener(listener: OnDragStateListener<PageItem>) {
    // 내가 누구고 드래그 상태가 무엇인지
    this.dragStateListener = listener;
  }
}

export class PageComponent extends Component<HTMLUListElement> implements Composable {
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super('<ul class="page"></ul>');

    this.el.addEventListener('dragover', (e: DragEvent) => {
      this.onDragOver(e);
    });
    this.el.addEventListener('drop', (e: DragEvent) => {
      this.onDragDrop(e);
    });
  }

  onDragOver(e: DragEvent) {
    e.preventDefault();
    // drop zone을 define할때에는  preventDefault()를 꼭 호출해야됨 안그러면 touch나 pointer이벤트에서 뭔가 일어날수있다 => 버그 많고 더러움
  }

  onDragDrop(e: DragEvent) {
    e.preventDefault();
  }

  addChild(section: Component<HTMLElement>) {
    const item = new this.pageItemConstructor();
    item.addChild(section);
    item.attachTo(this.el, 'beforeend'); // 맨마지막
    item.setOnCloseListener(() => {
      item.removeFrom(this.el);
    });
    item.setOnDragStateListener((target: SectionContainer, state: DragState) => {});
  }
}
