export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

// Объявление класса

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

// Способ оплаты

export type TPayment = 'card' | 'cash';

// Информация о товаре

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

// Информация о покупателе

export interface IBuyer {
    payment: TPayment | null;
    email: string;
    phone: string;
    address: string;
}

// Ответ

export interface IProducts {
    items: IProduct[];
    total: number;
}

// Содержимое заказа

export interface IBuyers extends IBuyer {
    total: number;
    items: string[];
}