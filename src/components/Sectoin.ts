import { Component } from './Component.js';

export class Section extends Component<HTMLUListElement> {
  constructor() {
    super('<section class="page">섹션 컴포넌트</section>');
  }
}
