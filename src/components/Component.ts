// api가 있다면 component 자체로 소통하기보다 interface로 소통하는게 좋다.

export interface ComponentInterface {
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
  removeFrom(parent: HTMLElement): void;
  attach(com: ComponentInterface, position?: InsertPosition): void;
  registerEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown,
  ): void;
}
// HTML El을 만드는 작업을 캡슐화함 외부에서는 어떻게 만드는지 상관하지않음

export class Component<T extends HTMLElement> implements ComponentInterface {
  // 상속하는 자식만 읽기 가능 => Protected
  protected readonly el: T;

  constructor(htmlString: string) {
    const template = document.createElement('template');
    template.innerHTML = htmlString;

    this.el = template.content.firstElementChild! as T;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.el);
  }

  removeFrom(parent: HTMLElement) {
    if (parent !== this.el.parentElement) {
      throw new Error('Parent mismatch');
    }
    parent.removeChild(this.el);
  }
  attach(com: ComponentInterface, position?: InsertPosition | undefined): void {
    com.attachTo(this.el, position);
  }
  registerEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown,
  ): void {
    this.el.addEventListener(type, listener);
  }
}
