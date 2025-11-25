import { IBuyer, TPayment } from "../../types";
import { IEvents } from "../base/Events";

// Объявление класса

export class Buyer {

// Поля класса    

    private buyer: IBuyer = {
        payment: '' as TPayment,
        email: '',
        phone: '',
        address: ''
    };

// Конструктор

    constructor(protected events: IEvents) {} 

// Способ оплаты

    savepayment(payment: TPayment): void {
        this.buyer.payment = payment;
        this.events.emit('buyer:changed', { field: 'payment' });
    }

// Электронный адрес

    saveemail(email: string): void {
        this.buyer.email = email;
        this.events.emit('buyer:changed', { field: 'email' });
    }

// Телефон

    savephone(phone: string): void {
        this.buyer.phone = phone;
        this.events.emit('buyer:changed', { field: 'phone' }); 
    }

// Адрес

    saveaddress(address: string): void {
        this.buyer.address = address;
        this.events.emit('buyer:changed', { field: 'address' });
    }

// Проверка на ошибки     

    buyervalidate(): { [key: string]: string } {
        const errors: { [key: string]: string } = {};

        if (!this.buyer.payment) {
            errors.payment = 'Не выбран способ оплаты';
        }

        if (!this.buyer.address?.trim()) {
            errors.address = 'Не указан адрес';
        }

        if (!this.buyer.email?.trim()) {
            errors.email = 'Не указан email';
        }

        if (!this.buyer.phone?.trim()) {
            errors.phone = 'Не указан телефон';
        }

        return errors;
    }

// Сохранение данных покупателя

    savebuyerdata(): IBuyer {
        return { ...this.buyer };
    }

// Очистка данных

    buyerclear(): void {
        this.buyer = {
            
            payment: '' as TPayment,
            email: '',
            phone: '',
            address: ''
        };
    }
}