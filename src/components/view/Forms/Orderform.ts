import { Form } from './Form.ts';
import { TPayment } from '../../../types/index.ts';
import { IEvents } from '../../base/Events.ts';

// Объявление класса

export class OrderForm extends Form {

// Поля класса
  
    protected forPaymentButtons: NodeListOf<HTMLButtonElement>;
    protected forAddress: HTMLInputElement;

// Конструктор

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.forPaymentButtons = this.container.querySelectorAll('button[name]');
        this.forAddress = this.container.querySelector('input[name="address"]')!;

// Обработка кнопок

        this.forPaymentButtons.forEach(button => {
            button.addEventListener('click', () => {
                const payment = button.name as TPayment;
                this.events.emit('order:paymentChange', { payment });
            });
        });

// Для введения адреса

        this.forAddress.addEventListener('input', () => {
            this.events.emit('order:addressChange', { address: this.forAddress.value }); 
        });
    }

// Обработка отправки

    protected onSubmit(): void {
        this.events.emit('order:submit'); 
    }

// Установка способа оплаты

    set payment(value: TPayment) {
        this.forPaymentButtons.forEach(button => {
            if (button.name === value) {
                button.classList.add('button_alt-active');
            } else {
                button.classList.remove('button_alt-active');
            }
        });
    }

// Отправка адреса

    set address(value: string) {
        this.forAddress.value = value;
    }
}