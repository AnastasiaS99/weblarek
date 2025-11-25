import { IProduct } from "../../types";
import { IEvents } from "../../components/base/Events";

// Объявление класса

export class ShoppingCart {

// Поля класса

    private items: IProduct[] = [];

// Конструктор
    
    constructor(protected events: IEvents) {}

// Добавление товара в корзину

    additemshoppingcart(item: IProduct): void {
        this.items.push(item);
        this.events.emit('cart:changed', { 
            items: this.items, 
            count: this.items.length,
            total: this.totalpriceshoppingcart()
        });
    }

// Удаление товара из корзины

    removeitemshoppingcart(itemId: string): void {
        this.items = this.items.filter(item => item.id !== itemId);
        this.events.emit('cart:changed', { 
            items: this.items, 
            count: this.items.length,
            total: this.totalpriceshoppingcart()
        });
    }

// Количество товаров в корзине
    
    countitemshoppingcart(): number {
        return this.items.length;
    }

// Текущий список товаров

    saveitemsshoppingcart(): IProduct[] {
        return this.items;
    }

// Сумма корзины

    totalpriceshoppingcart(): number {
        return this.items.reduce((total, item) => total + (item.price || 0), 0);
    }

// Проверка товаров в корзине

    containsshoppingcart(itemId: string): boolean {
        return this.items.some(item => item.id === itemId);
    }

// Очистка корзины

    clearshoppingcart(): void {
        this.items = [];
        this.events.emit('cart:changed', { 
            items: this.items, 
            count: 0,
            total: 0
        });
    }
}