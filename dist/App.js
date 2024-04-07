import { ImageComponent } from './components/Image.js';
import { Note } from './components/item/note.js';
import { Todo } from './components/item/todo.js';
import { VideoComponent } from './components/item/video.js';
import { PageComponent, PageItem } from './components/page/Page.js';
import { InputDialog } from './modal/dialog.js';
import { MediaSectionInput } from './modal/input/media_input.js';
import { TextSectionInput } from './modal/input/text_input.js';
export const App = class {
    constructor(appRoot, modalRoot) {
        this.page = new PageComponent(PageItem);
        this.page.attachTo(appRoot);
        const note = new Note('새로운노트', '내용');
        this.page.addChild(note);
        const todo = new Todo('투두 타이틀', '투두내용');
        this.page.addChild(todo);
        const imgBtn = document.querySelector('#new-img');
        const videoBtn = document.querySelector('#new-video');
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
        const noteBtn = document.querySelector('#new-note');
        const todoBtn = document.querySelector('#new-todo');
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
new App(document.querySelector('.doc'), document.querySelector('#modal_root'));
