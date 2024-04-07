import { Component, ComponentInterface } from './components/Component.js';
import { ImageComponent } from './components/Image.js';
import { Note } from './components/item/note.js';
import { Todo } from './components/item/todo.js';
import { VideoComponent } from './components/item/video.js';
import { Composable, PageComponent, PageItem } from './components/page/Page.js';
import { InputDialog, MediaData, TextData } from './modal/dialog.js';
import { MediaSectionInput } from './modal/input/media_input.js';
import { TextSectionInput } from './modal/input/text_input.js';

type InputComponentConstrucot<T extends (MediaData | TextData) & ComponentInterface> = {
  new (): T;
};
export const App = class {
  private readonly page: Component<HTMLElement> & Composable;

  constructor(appRoot: HTMLElement, private modalRoot: HTMLElement) {
    this.page = new PageComponent(PageItem);
    this.page.attachTo(appRoot);

    this.bindElToModal<MediaSectionInput>(
      '#new-img',
      MediaSectionInput,
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url),
    );

    this.bindElToModal<MediaSectionInput>(
      '#new-video',
      MediaSectionInput,
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url),
    );

    this.bindElToModal<TextSectionInput>(
      '#new-note',
      TextSectionInput,
      (input: TextSectionInput) => new Note(input.title, input.body),
    );
    this.bindElToModal<TextSectionInput>(
      '#new-todo',
      TextSectionInput,
      (input: TextSectionInput) => new Todo(input.title, input.body),
    );
  }

  private bindElToModal<T extends (MediaData | TextData) & ComponentInterface>(
    selector: string,
    InputComponent: InputComponentConstrucot<T>,
    makeSectoin: (input: T) => ComponentInterface,
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;

    element.addEventListener('click', () => {
      const modal = new InputDialog();

      const input = new InputComponent();

      modal.addChild(input);

      modal.attachTo(this.modalRoot);

      modal.setOnCloseListener(() => {
        modal.removeFrom(this.modalRoot);
      });

      modal.setOnSubmitListener(() => {
        const content = makeSectoin(input);
        this.page.addChild(content);
        modal.removeFrom(this.modalRoot);
      });
    });
  }
};

new App(document.querySelector('.doc')! as HTMLElement, document.querySelector('#modal_root')! as HTMLDivElement);
