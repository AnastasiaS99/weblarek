import { Component } from '../../base/Component.ts';
import { IEvents } from '../../base/Events.ts';

// Объявление класса

export abstract class Form extends Component<any> {

// Поля класса
    
    protected forsubmit: HTMLButtonElement;
    protected forerrors: HTMLElement;

// Конструктор

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.forsubmit = this.container.querySelector('button[type="submit"]')!;
        this.forerrors = this.container.querySelector('.form__errors')!;

        this.container.addEventListener('submit', (event) => {
            event.preventDefault();
            this.onSubmit();
        });
    }

// Обработка формы

    protected abstract onSubmit(): void;

// Кнопка оплаты

    set valid(value: boolean) {
        this.setDisabled(this.forsubmit, !value);
    }

// Сообщения об ошибках

    set errors(value: string) {
        this.setText(this.forerrors, value);
    }
}