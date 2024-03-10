import { PageComponent } from './components/Page.js';

export const App = class {
  private readonly page: PageComponent;

  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoot);
  }
};

new App(document.querySelector('.doc')! as HTMLElement);
