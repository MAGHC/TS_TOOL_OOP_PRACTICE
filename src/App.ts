import { Component } from './components/Component.js';
import { ImageComponent } from './components/Image.js';
import { Note } from './components/item/note.js';
import { Todo } from './components/item/todo.js';
import { VideoComponent } from './components/item/video.js';
import { Composable, PageComponent, PageItem } from './components/page/Page.js';
import { InputDialog } from './modal/dialog.js';
import { MediaSectionInput } from './modal/input/media_input.js';
import { TextSectionInput } from './modal/input/text_input.js';

export const App = class {
  private readonly page: Component<HTMLElement> & Composable;

  constructor(appRoot: HTMLElement, modalRoot: HTMLElement) {
    this.page = new PageComponent(PageItem);
    this.page.attachTo(appRoot);

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

    const noteBtn = document.querySelector('#new-note')! as HTMLButtonElement;
    const todoBtn = document.querySelector('#new-todo')! as HTMLButtonElement;

    noteBtn.addEventListener('click', () => {
      const modal = new InputDialog();

      const noteInputSection = new TextSectionInput();

      modal.addChild(noteInputSection);

      modal.attachTo(modalRoot);

      modal.setOnCloseListener(() => {
        modal.removeFrom(modalRoot);
      });

      modal.setOnSubmitListener(() => {
        const newNote = new Note(noteInputSection.title, noteInputSection.body);
        this.page.addChild(newNote);
        modal.removeFrom(modalRoot);
      });
    });

    todoBtn.addEventListener('click', () => {
      const modal = new InputDialog();

      const todoInputSection = new TextSectionInput();

      modal.addChild(todoInputSection);

      modal.attachTo(modalRoot);

      modal.setOnCloseListener(() => {
        modal.removeFrom(modalRoot);
      });

      modal.setOnSubmitListener(() => {
        const newTodo = new Todo(todoInputSection.title, todoInputSection.body);
        this.page.addChild(newTodo);
        modal.removeFrom(modalRoot);
      });
    });
  }
};

new App(document.querySelector('.doc')! as HTMLElement, document.querySelector('#modal_root')! as HTMLDivElement);
