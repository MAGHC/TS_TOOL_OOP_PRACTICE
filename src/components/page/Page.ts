import { Component } from '../Component.js';

export class PageComponent extends Component<HTMLUListElement> {
  constructor() {
    super('<ul class="page">페이지 컴포넌트</ul>');
  }
}
