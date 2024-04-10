import { Draggable, Dropable, EnableDragging, EnableDrop, EnableHover, Hoverable } from '../../decorators/draggable.js';
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

interface SectionContainer extends Component<HTMLElement>, Composable, Draggable, Hoverable {
  setOnCloseListener(listener: OnCloseListener): void;
  setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void;
  muteChildren(state: 'mute' | 'unmute'): void;
  getBoundingRect(): DOMRect;
  onDropped(): void;
}

@EnableDragging
@EnableHover
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
  }

  onDragStart(_: DragEvent) {
    //_로 안쓴다고 알릴수있음ㄴ
    this.notifyDragObservers('start');
    this.el.classList.add('dragStarted');
  }

  onDragEnd(_: DragEvent) {
    this.notifyDragObservers('end');
    this.el.classList.remove('dragStarted');
  }

  onDragEnter(_: DragEvent) {
    this.notifyDragObservers('enter');
    this.el.classList.add('dropArea');
  }

  onDragLeave(_: DragEvent) {
    this.notifyDragObservers('leave');
    this.el.classList.remove('dropArea');
  }

  onDropped() {
    this.el.classList.remove('dropArea');
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

  muteChildren(state: 'mute' | 'unmute'): void {
    if (state === 'mute') {
      this.el.classList.add('mute-children');
    } else {
      this.el.classList.remove('mute-children');
    }
  }

  getBoundingRect(): DOMRect {
    return this.el.getBoundingClientRect();
  }
}

@EnableDrop
export class PageComponent extends Component<HTMLUListElement> implements Composable, Dropable {
  private dropTarget?: SectionContainer;
  private dragTarget?: SectionContainer;
  // 버그를 막기위해 children을 알아야.
  private children = new Set<SectionContainer>();

  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super('<ul class="page"></ul>');
  }

  onDragOver() {
    console.log('saddsadsa  ');
    // drop zone을 define할때에는  preventDefault()를 꼭 호출해야됨 안그러면 touch나 pointer이벤트에서 뭔가 일어날수있다 => 버그 많고 더러움
  }

  onDragDrop(e: DragEvent) {
    // 드랍 다켓이랑 start 타켓이랑 변경시켜버리기

    if (!this.dropTarget) {
      return;
    }
    if (this.dragTarget && this.dragTarget !== this.dropTarget) {
      const dropY = e.clientY;
      const srcEl = this.dragTarget.getBoundingRect();
      this.dragTarget.removeFrom(this.el);

      this.dropTarget.attach(this.dragTarget, dropY < srcEl.y ? 'beforebegin' : 'afterend');

      console.log(dropY < srcEl.y, '???sa?/dsa?');
    }

    console.log(this.dragTarget, '?DSaasddassad');

    this.dropTarget.onDropped();
  }

  addChild(section: Component<HTMLElement>) {
    const item = new this.pageItemConstructor();
    item.addChild(section);
    item.attachTo(this.el, 'beforeend'); // 맨마지막
    item.setOnCloseListener(() => {
      item.removeFrom(this.el);
      this.children.delete(item);
    });

    this.children.add(item);

    item.setOnDragStateListener((target: SectionContainer, state: DragState) => {
      switch (state) {
        case 'start':
          this.dragTarget = target;

          this.updateSection('mute');

          break;
        case 'end':
          this.dragTarget = undefined;
          this.updateSection('unmute');

          break;

        case 'leave':
          this.dropTarget = undefined;
          break;

        case 'enter':
          this.dropTarget = target;

          break;

        default:
          throw new Error(`${state} this state is missing`);
      }
    });
  }
  private updateSection(state: 'mute' | 'unmute') {
    this.children.forEach((section) => {
      section.muteChildren(state);
    });
  }
}
