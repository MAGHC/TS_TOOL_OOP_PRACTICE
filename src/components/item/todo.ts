import { Component } from '../Component.js';

export class Todo extends Component<HTMLElement> {
  constructor(title: string, todo: string) {
    super(`
        <section class="todo">
            <h2 class="todo_title"></h2>
            <input type='checkbox' class="todo_check"></input>
        </section>`);
    const $todoTitle = this.el.querySelector('.todo_title')! as HTMLHeadingElement;

    $todoTitle.textContent = title;

    const $todoStatus = this.el.querySelector('.todo_check')! as HTMLInputElement;

    const newTodo = document.createElement('span');
    newTodo.textContent = todo;

    $todoStatus.insertAdjacentElement('afterend', newTodo);
  }
}
