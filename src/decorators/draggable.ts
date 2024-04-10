import { ComponentInterface } from '../components/Component';

export interface Hoverable {
  onDragEnter(e: DragEvent): void;
  onDragLeave(e: DragEvent): void;
}

export interface Draggable {
  onDragStart(e: DragEvent): void;
  onDragEnd(e: DragEvent): void;
}

export interface Dropable {
  onDragOver(event: DragEvent): void;
  onDragDrop(event: DragEvent): void;
}

type GlobalConstructor<T = {}> = new (...args: any[]) => T;
type DraggableClass = GlobalConstructor<ComponentInterface & Draggable>;
type DragHoverClass = GlobalConstructor<ComponentInterface & Hoverable>;
type DropTargetClass = GlobalConstructor<ComponentInterface & Dropable>;

export function EnableDragging<TBase extends DraggableClass>(Base: TBase) {
  return class DraggableItem extends Base {
    constructor(...args: any[]) {
      super(...args);
      this.registerEventListener('dragstart', (event: DragEvent) => {
        this.onDragStart(event);
      });
      this.registerEventListener('dragend', (event: DragEvent) => {
        this.onDragEnd(event);
      });
    }
  };
}

export function EnableHover<TBase extends DragHoverClass>(Base: TBase) {
  return class DragHoverArea extends Base {
    constructor(...args: any[]) {
      super(...args);
      this.registerEventListener('dragenter', (event: DragEvent) => {
        event.preventDefault();
        this.onDragEnter(event);
      });
      this.registerEventListener('dragleave', (event: DragEvent) => {
        this.onDragLeave(event);
      });
    }
  };
}

export function EnableDrop<TBase extends DropTargetClass>(Base: TBase) {
  return class DropArea extends Base {
    constructor(...args: any[]) {
      super(...args);
      this.registerEventListener('dragover', (event: DragEvent) => {
        event.preventDefault();
        this.onDragOver(event);
      });
      this.registerEventListener('drop', (event: DragEvent) => {
        event.preventDefault();
        this.onDragDrop(event);
      });
    }
  };
}
