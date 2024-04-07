import { Component } from '../../components/Component.js';

export class TextSectionInput extends Component<HTMLElement> {
  constructor() {
    super(`<div>
    <form class="form__container">
      <label for="title">Title</label>
      <input type="text" id="title" />
    </form>
    <form class="form__container">
      <label for="body">Body</label>
      <textarea row="4" type="text" id="body" ></textarea>
    </form>
  </div>
  `);
  }

  get title(): string {
    const el = this.el.querySelector('#title')! as HTMLInputElement;
    return el.value;
  }
  get body(): string {
    const el = this.el.querySelector('#body')! as HTMLTextAreaElement;
    return el.value;
  }
}
