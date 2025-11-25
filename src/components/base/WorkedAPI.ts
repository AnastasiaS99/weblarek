import { IApi, IProductList, IOrderResult, IOrderRequest } from "../../types";


// Объявление класса
export class WorkedAPI {
    private api: IApi;

// Конструктор

    constructor(api: IApi) {
        this.api = api;
    }

// Возвращение списка продуктов

    async getProductList(): Promise<IProductList> {
        return await this.api.get<IProductList>('/product');
    }

// Новый заказ

    async createOrder(order: IOrderRequest): Promise<IOrderResult> {
        return await this.api.post<IOrderResult>('/order', order);
    }
}