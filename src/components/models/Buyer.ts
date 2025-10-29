import {IBuyer, TPayment} from '../../types';

// Объявление класса

export class Buyer {
    private payment: TPayment | null = null;
    private email = '';
    private phone = '';
    private address = '';

// Сохранение данных в модели. 
// Один общий метод или отдельные методы для каждого поля;

    saveBuyer(data: Partial<IBuyer>): void {
        if (data.payment !== undefined) this.payment = data.payment;
        if (data.email !== undefined) this.email = data.email;
        if (data.phone !== undefined) this.phone = data.phone;
        if (data.address !== undefined) this.address = data.address;
    }

// Получение всех данных покупателя;

    getBuyer(): IBuyer {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address,
        };
    }

// Очистка данных покупателя;

    clearBuyer(): void {
        this.payment = null;
        this.email = '';
        this.phone = '';
        this.address = '';
    }

// Валидация данных.

    validateBuyer(): Record<string, string> {
        const errors: Record<string, string> = {};
        if (!this.payment) errors.payment = 'Не выбран вид оплаты';
        if (!this.email.trim()) errors.email = 'Укажите адрес электронной почты';
        if (!this.phone.trim()) errors.phone = 'Укажите телефон';
        if (!this.address.trim()) errors.address = 'Укажите адрес доставки';
        return errors;
    }

}