import { Component } from '../../components/Component.js';

export class MediaSectionInput extends Component<HTMLElement> {
  constructor() {
    super(`<div>
    <form class="form__container">
      <label for="title">Title</label>
      <input type="text" id="title" />
    </form>
    <form class="form__container">
      <label for="url">Url</label>
      <input type="text" id="url" />
    </form>
  </div>
  `);
  }

  get title(): string {
    const el = this.el.querySelector('#title')! as HTMLInputElement;
    return el.value;
  }
  get url(): string {
    const el = this.el.querySelector('#url')! as HTMLInputElement;
    return el.value;
  }
}
