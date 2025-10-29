import { IApi, Iproducts, Ibuyers } from '../../types/index';

// Объявление класса

export class WorkedAPI {
    api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

// Данные о продуктах, полученные из сервера

    async fetchProducts(): Promise<Iproducts> {
        return await this.api.get<Iproducts>('/product/');
    }
    
// Отправка на сервер информации о покупателях и товарах

    async sendOrder(orderData: Ibuyers): Promise<{id: string, total: number}> {
        return await this.api.post<{id: string, total: number}>('/order/', orderData);
    }
}