import { Component } from '../base/Component.ts';
import { IEvents } from '../base/Events.ts';

// Интерфейс

interface HeaderData {
    counter: number;
}

// Объявление класса

export class Header extends Component<HeaderData> {

// Поля класса

    protected cartButton: HTMLButtonElement;
    protected counterElement: HTMLElement;

// Конструктор

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.cartButton = this.container.querySelector('.header__basket')!;
        this.counterElement = this.container.querySelector('.header__basket-counter')!;
        
        this.cartButton.addEventListener('click', () => {
            this.events.emit('basket:open');
        });
    }

// Обновление количества товаров

    set counter(value: number) {
        this.setText(this.counterElement, value.toString());
    }
}