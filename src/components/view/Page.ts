import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

// Объявление класса

export class Page extends Component<null> {

// Конструктор

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
    }

// Установка страницы

    setView(view: 'catalog' | 'basket' | 'order'): void {
        this.container.setAttribute('data-view', view);
    }

// Установка текущей страницы

    getCurrentView(): string {
        return this.container.getAttribute('data-view') || 'catalog';
    }
}