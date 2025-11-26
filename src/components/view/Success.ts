import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

// Объявление класса

export class Success extends Component<{ total: number }> {

// Поля класса

    protected forTotal: HTMLElement;
    protected forCloseButton: HTMLButtonElement;

// Конструктор

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.forTotal = this.container.querySelector('.order-success__description')!;
        this.forCloseButton = this.container.querySelector('.order-success__close')!;
        
        this.forCloseButton.addEventListener('click', () => {
            this.events.emit('success:close');
        });
    }

// Обновление текста

    set total(value: number) {
        this.setText(this.forTotal, `Списано ${value} синапсов`);
    }
}