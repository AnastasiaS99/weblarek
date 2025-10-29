import {IProduct} from '../../types';

// Объявление класса

export class Products {

// Свойства массива

    private products: IProduct[] = [];
    private productsFocus: IProduct | null = null;

// Сохранение массива товаров полученного в параметрах метода;

    saveproducts(products: IProduct[]): void {
        this.products = Array.isArray(products) ? [...products] : [];
    }

// Получение массива товаров из модели;

    getproducts(): IProduct[] {
        return [...this.products];
    }

// Получение одного товара по его id;

    getproductsById(id: string): IProduct | undefined {
        return this.products.find((product) => product.id === id);
    }
    
// Сохранение товара для подробного отображения;

    saveproductsSelect(products: IProduct | null): void {
        this.productsFocus = products;
    }

// Получение товара для подробного отображения.

    getproductsSelect(): IProduct | null {
        return this.productsFocus;
    }
}