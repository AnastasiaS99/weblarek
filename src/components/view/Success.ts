import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

// Объявление класса

export class Success extends Component<{ total: number }> {

// Поля класса

    protected fortotal: HTMLElement;
    protected forcloseButton: HTMLButtonElement;

// Конструктор

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.fortotal = this.container.querySelector('.order-success__description')!;
        this.forcloseButton = this.container.querySelector('.order-success__close')!;
        
        this.forcloseButton.addEventListener('click', () => {
            this.events.emit('success:close');
        });
    }

// Обновление текста

    set total(value: number) {
        this.setText(this.fortotal, `Списано ${value} синапсов`);
    }
}