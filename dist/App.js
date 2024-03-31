import { ImageComponent } from './components/Image.js';
import { Note } from './components/item/note.js';
import { Todo } from './components/item/todo.js';
import { VideoComponent } from './components/item/video.js';
import { PageComponent, PageItem } from './components/page/Page.js';
import { InputDialog } from './modal/dialog.js';
import { MediaSectionInput } from './modal/input/media_input.js';
export const App = class {
    constructor(appRoot, modalRoot) {
        this.page = new PageComponent(PageItem);
        this.page.attachTo(appRoot);
        const note = new Note('새로운노트', '내용');
        this.page.addChild(note);
        const todo = new Todo('투두 타이틀', '투두내용');
        this.page.addChild(todo);
        const video = new VideoComponent('슈카dd월드', 'https://www.youtube.com/watch?v=Zp--nzg6u_A');
        this.page.addChild(video);
        const imgBtn = document.querySelector('#new-img');
        imgBtn.addEventListener('click', () => {
            const modal = new InputDialog();
            const mediaIpnutSection = new MediaSectionInput();
            modal.addChild(mediaIpnutSection);
            modal.attachTo(modalRoot);
            modal.setOnCloseListener(() => {
                modal.removeFrom(modalRoot);
            });
            modal.setOnSubmitListener(() => {
                console.log('submt');
                const image = new ImageComponent(mediaIpnutSection.url, mediaIpnutSection.title);
                this.page.addChild(image);
                modal.removeFrom(modalRoot);
            });
        });
    }
};
new App(document.querySelector('.doc'), document.querySelector('#modal_root'));
