import { Component } from '../components/Component.js';
import { Composable } from '../components/page/Page.js';

type OnClosetListener = () => void;
type OnSubmitListener = () => void;

export class InputDialog extends Component<HTMLElement> implements Composable {
  closeListener?: OnClosetListener;
  submitListenr?: OnSubmitListener;

  constructor() {
    super(`<section class="dialog">
        <button class="close_btn">&times;</button>
        <div class="modal__body"></div>
        <button class="modal__submit"></button>
      </section>
      `);

    const closeBtn = this.el.querySelector('.close_btn')! as HTMLElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };

    const submitBtn = this.el.querySelector('.modal__submit')! as HTMLElement;
    submitBtn.onclick = () => {
      this.submitListenr && this.submitListenr();
    };
  }

  setOnCloseListener(listener: OnClosetListener) {
    this.closeListener = listener;
  }

  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListenr = listener;
  }

  addChild(child: Component<HTMLElement>): void {
    const body = this.el.querySelector('.modal__body')! as HTMLElement;
    child.attachTo(body);
  }
}
