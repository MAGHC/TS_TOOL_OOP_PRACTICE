import { Component } from '../Component.js';

export class Note extends Component<HTMLElement> {
  constructor(title: string, body: string) {
    super(`
        <section class="note">
            <h2 class="note_title"></h2>
            <h2 class="note_body"></h2>
        </section>`);
    const $title = this.el.querySelector('.note_title')! as HTMLHeadingElement;

    $title.textContent = title;

    const $body = this.el.querySelector('.note_body')! as HTMLHeadingElement;
    $body.textContent = body;
  }
}
