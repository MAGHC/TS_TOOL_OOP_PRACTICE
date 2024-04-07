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
        this.modalRoot = modalRoot;
        this.page = new PageComponent(PageItem);
        this.page.attachTo(appRoot);
        this.bindElToModal('#new-img', MediaSectionInput, (input) => new ImageComponent(input.title, input.url));
        this.bindElToModal('#new-video', MediaSectionInput, (input) => new VideoComponent(input.title, input.url));
        this.bindElToModal('#new-note', TextSectionInput, (input) => new Note(input.title, input.body));
        this.bindElToModal('#new-todo', TextSectionInput, (input) => new Todo(input.title, input.body));
    }
    bindElToModal(selector, InputComponent, makeSectoin) {
        const element = document.querySelector(selector);
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
new App(document.querySelector('.doc'), document.querySelector('#modal_root'));
