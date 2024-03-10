import { PageComponent } from './components/Page.js';
export const App = class {
    constructor(appRoot) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
    }
};
new App(document.querySelector('.doc'));
