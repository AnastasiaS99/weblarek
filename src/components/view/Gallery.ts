import { Component } from '../base/Component.ts';

// Интерфейс

interface GalleryData {
    catalog: HTMLElement[];
}

// Объявление класса

export class Gallery extends Component<GalleryData> {

// Конструктор 
    
    constructor(container: HTMLElement) {
        super(container);
    }

// Содержание галереи

    set catalog(items: HTMLElement[]) {
        this.container.replaceChildren(...items);
    }
}