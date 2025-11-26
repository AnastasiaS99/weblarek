import { IProduct } from "../../types";
import { IEvents } from "../../components/base/Events";

// Объявление класса

export class ShoppingCart {

// Поля класса

    private items: IProduct[] = [];

// Конструктор
    
    constructor(protected events: IEvents) {}

// Добавление товара в корзину

    addItemShoppingCart(item: IProduct): void {
        this.items.push(item);
        this.events.emit('cart:changed', { 
            items: this.items, 
            count: this.items.length,
            total: this.totalPriceShoppingCart()
        });
    }

// Удаление товара из корзины

    removeItemShoppingCart(itemId: string): void {
        this.items = this.items.filter(item => item.id !== itemId);
        this.events.emit('cart:changed', { 
            items: this.items, 
            count: this.items.length,
            total: this.totalPriceShoppingCart()
        });
    }

// Количество товаров в корзине
    
    countItemShoppingCart(): number {
        return this.items.length;
    }

// Текущий список товаров

    saveItemsShoppingCart(): IProduct[] {
        return this.items;
    }

// Сумма корзины

    totalPriceShoppingCart(): number {
        return this.items.reduce((total, item) => total + (item.price || 0), 0);
    }

// Проверка товаров в корзине

    containsShoppingCart(itemId: string): boolean {
        return this.items.some(item => item.id === itemId);
    }

// Очистка корзины

    clearShoppingCart(): void {
        this.items = [];
        this.events.emit('cart:changed', { 
            items: this.items, 
            count: 0,
            total: 0
        });
    }
}