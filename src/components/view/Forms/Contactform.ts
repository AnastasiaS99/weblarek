import { Form } from './Form.ts';
import { IEvents } from '../../base/Events.ts';

// Объявление класса

export class Contactform extends Form {

// Поля класса

    protected foremail: HTMLInputElement;
    protected forphone: HTMLInputElement;

// Конструктор

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.foremail = this.container.querySelector('input[name="email"]')!;
        this.forphone = this.container.querySelector('input[name="phone"]')!;
        
        this.foremail.addEventListener('input', () => {
            this.events.emit('contacts:emailChange', { email: this.foremail.value });
        });

        this.forphone.addEventListener('input', () => {
            this.events.emit('contacts:phoneChange', { phone: this.forphone.value });
        });
    }

// Обработка кнопки

    protected onSubmit(): void {
        this.events.emit('contacts:submit');
    }

// Для отправки электронного адреса

    set email(value: string) {
        this.foremail.value = value;
    }

// Для отправки телефона

    set phone(value: string) {
        this.forphone.value = value;
    }
}