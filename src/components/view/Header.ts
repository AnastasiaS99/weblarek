import { Component } from '../base/Component.ts';
import { IEvents } from '../base/Events.ts';

// Интерфейс

interface HeaderData {
    counter: number;
}

// Объявление класса

export class Header extends Component<HeaderData> {

// Поля класса

    protected cartbutton: HTMLButtonElement;
    protected counterelement: HTMLElement;

// Конструктор

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.cartbutton = this.container.querySelector('.header__basket')!;
        this.counterelement = this.container.querySelector('.header__basket-counter')!;
        
        this.cartbutton.addEventListener('click', () => {
            this.events.emit('basket:open');
        });
    }

// Обновление количества товаров

    set counter(value: number) {
        this.setText(this.counterelement, value.toString());
    }
}