import { Component } from './components/Component.js';
import { ImageComponent } from './components/Image.js';
import { Note } from './components/item/note.js';
import { Todo } from './components/item/todo.js';
import { VideoComponent } from './components/item/video.js';
import { Composable, PageComponent, PageItem } from './components/page/Page.js';
import { InputDialog } from './modal/dialog.js';
import { MediaSectionInput } from './modal/input/media_input.js';

export const App = class {
  private readonly page: Component<HTMLElement> & Composable;

  constructor(appRoot: HTMLElement, modalRoot: HTMLElement) {
    this.page = new PageComponent(PageItem);
    this.page.attachTo(appRoot);

    const note = new Note('새로운노트', '내용');
    this.page.addChild(note);

    const todo = new Todo('투두 타이틀', '투두내용');
    this.page.addChild(todo);

    const imgBtn = document.querySelector('#new-img')! as HTMLButtonElement;
    const videoBtn = document.querySelector('#new-video')! as HTMLButtonElement;

    console.log(videoBtn);
    videoBtn.addEventListener('click', () => {
      const modal = new InputDialog();

      const mediaIpnutSection = new MediaSectionInput();

      modal.addChild(mediaIpnutSection);

      modal.attachTo(modalRoot);

      modal.setOnCloseListener(() => {
        modal.removeFrom(modalRoot);
      });

      modal.setOnSubmitListener(() => {
        const video = new VideoComponent(mediaIpnutSection.title, mediaIpnutSection.url);

        this.page.addChild(video);
        modal.removeFrom(modalRoot);
      });
    });

    // onclick에 할당하면 기존의 리스너를덮어씌움.
    imgBtn.addEventListener('click', () => {
      const modal = new InputDialog();

      const mediaIpnutSection = new MediaSectionInput();

      modal.addChild(mediaIpnutSection);

      modal.attachTo(modalRoot);

      modal.setOnCloseListener(() => {
        modal.removeFrom(modalRoot);
      });

      modal.setOnSubmitListener(() => {
        const image = new ImageComponent(mediaIpnutSection.url, mediaIpnutSection.title);
        this.page.addChild(image);
        modal.removeFrom(modalRoot);
      });
    });
  }
};

new App(document.querySelector('.doc')! as HTMLElement, document.querySelector('#modal_root')! as HTMLDivElement);
