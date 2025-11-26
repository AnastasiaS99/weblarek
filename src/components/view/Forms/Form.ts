import { Component } from '../../base/Component.ts';
import { IEvents } from '../../base/Events.ts';

// Объявление класса

export abstract class Form extends Component<any> {

// Поля класса
    
    protected forSubmit: HTMLButtonElement;
    protected forErrors: HTMLElement;

// Конструктор

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.forSubmit = this.container.querySelector('button[type="submit"]')!;
        this.forErrors = this.container.querySelector('.form__errors')!;

        this.container.addEventListener('submit', (event) => {
            event.preventDefault();
            this.onSubmit();
        });
    }

// Обработка формы

    protected abstract onSubmit(): void;

// Кнопка оплаты

    set valid(value: boolean) {
        this.setDisabled(this.forSubmit, !value);
    }

// Сообщения об ошибках

    set errors(value: string) {
        this.setText(this.forErrors, value);
    }
}