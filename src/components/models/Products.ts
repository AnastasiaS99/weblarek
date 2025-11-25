import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

// Объявление класса

export class Products {

// Поля класса

    protected products: IProduct[] = [];
    protected selectedProduct: IProduct | null = null;

// Конструктор

    constructor(protected events: IEvents) {}

// Массив товаров

    saveproducts(items: IProduct[]): void {
        this.products = items;
        console.log('Products loaded:', this.products.length);
        this.events.emit('products:visiable', { items: this.products });
    }

// Текущий список продуктов

    getproducts(): IProduct[] {
        return this.products;
    }

// Текущий выбранный продукт

    selectedproduct(product: IProduct): void {
        this.selectedProduct = product;
        console.log('Product set for preview:', product.title);
        this.events.emit('product:changed', { product });
    }
}