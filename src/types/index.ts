export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

// Интерфейс

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

// Интерфейс

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number|null;
}

// Тип оплаты

export type TPayment = 'cash' | 'card';

// Данные покупателя

export interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}

// Завершение в выбор товаров

export interface IOrderResult {
    id: string;
    total: number;
}

// Структура данных для отправки заказа

export interface IOrderRequest {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
    items: string[];
    total: number;
}

// Список продуктов

export interface IProductList {
    total: number;
    items: IProduct[];
}

// Расширение интерфейса

export interface ICartItem extends IProduct {
    index: number;
}