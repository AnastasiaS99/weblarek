import { Form } from './Form.ts';
import { IEvents } from '../../base/Events.ts';

// Объявление класса

export class ContactForm extends Form {

// Поля класса

    protected forEmail: HTMLInputElement;
    protected forPhone: HTMLInputElement;

// Конструктор

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.forEmail = this.container.querySelector('input[name="email"]')!;
        this.forPhone = this.container.querySelector('input[name="phone"]')!;
        
        this.forEmail.addEventListener('input', () => {
            this.events.emit('contacts:emailChange', { email: this.forEmail.value });
        });

        this.forPhone.addEventListener('input', () => {
            this.events.emit('contacts:phoneChange', { phone: this.forPhone.value });
        });
    }

// Обработка кнопки

    protected onSubmit(): void {
        this.events.emit('contacts:submit');
    }

// Для отправки электронного адреса

    set email(value: string) {
        this.forEmail.value = value;
    }

// Для отправки телефона

    set phone(value: string) {
        this.forPhone.value = value;
    }
}