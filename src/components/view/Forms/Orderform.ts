import { Form } from './Form.ts';
import { TPayment } from '../../../types/index.ts';
import { IEvents } from '../../base/Events.ts';

// Объявление класса

export class Orderform extends Form {

// Поля класса
  
    protected forpaymentButtons: NodeListOf<HTMLButtonElement>;
    protected foraddress: HTMLInputElement;

// Конструктор

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.forpaymentButtons = this.container.querySelectorAll('button[name]');
        this.foraddress = this.container.querySelector('input[name="address"]')!;

// Обработка кнопок

        this.forpaymentButtons.forEach(button => {
            button.addEventListener('click', () => {
                const payment = button.name as TPayment;
                this.events.emit('order:paymentChange', { payment });
            });
        });

// Для введения адреса

        this.foraddress.addEventListener('input', () => {
            this.events.emit('order:addressChange', { address: this.foraddress.value }); 
        });
    }

// Обработка отправки

    protected onSubmit(): void {
        this.events.emit('order:submit'); 
    }

// Установка способа оплаты

    set payment(value: TPayment) {
        this.forpaymentButtons.forEach(button => {
            if (button.name === value) {
                button.classList.add('button_alt-active');
            } else {
                button.classList.remove('button_alt-active');
            }
        });
    }

// Отправка адреса

    set address(value: string) {
        this.foraddress.value = value;
    }
}