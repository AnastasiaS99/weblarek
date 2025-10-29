import { IProduct } from "../../types";

// Объявление класса

export class ShoppingCart {
  private products: IProduct[] = [];

// Получение массива товаров, которые находятся в корзине;

  getProducts(): IProduct[] {
    return this.products;
  }

// Добавление товара, который был получен в параметре, в массив корзины; 

  addProduct(product: IProduct): void{
    this.products.push(product);
  }

// Удаление товара, полученного в параметре из массива корзины;

  removeProduct(product: IProduct): void {
    this.products = this.products.filter(pr => pr.id !== product.id);
  }

// Получение стоимости всех товаров в корзине; 

  getTotal(): number {
    let acc: number = 0;
    this.products.forEach(pr => acc += (pr.price || 0));
    return acc;
  }

// Получение количества товаров в корзине; 

  getCount(): number {
    return this.products.length;
  }
// Очистка корзины;

  clearShoppingCart(): void {
    this.products = [];
  }

// Проверка наличия товара в корзине по его id, полученного в параметр метода.

  hasProduct(id: string): boolean {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) return true;
    }
    return false;
  }
}