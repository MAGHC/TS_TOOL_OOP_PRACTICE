import { ImageComponent } from './components/Image.js';
import { Note } from './components/item/note.js';
import { Todo } from './components/item/todo.js';
import { VideoComponent } from './components/item/video.js';
import { PageComponent } from './components/page/Page.js';
export const App = class {
    constructor(appRoot) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
        const image = new ImageComponent('data:image/png;base64,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', '테스트용');
        this.page.addChild(image);
        const note = new Note('새로운노트', '내용');
        this.page.addChild(note);
        const todo = new Todo('투두 타이틀', '투두내용');
        this.page.addChild(todo);
        const video = new VideoComponent('슈카dd월드', 'https://www.youtube.com/watch?v=Zp--nzg6u_A');
        this.page.addChild(video);
    }
};
new App(document.querySelector('.doc'));
