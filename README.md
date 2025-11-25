# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Интернет-магазин «Web-Larёk»
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и  отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`


#### Класс Api
Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` -  хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

## Данные 
Всего в данном проекте два вида объектов, из которых можно получить нужные данные. 

### IProduct 
Содержит в себе информацию по товарам, а именно: 
`id: string` - Идентификатор товара.
`title: string` - Название товара.
`description: string` - Описание товара.
`image: string` - Изображение товара.
`category: string` - Категория товара.
`price: number | null` - Цена товара. Если null, товар недоступен.

### IBuyer
Содержит в себе информацию по покупателям, а именно:
`payment: 'card' | 'cash'` - Вид оплаты. 
`email: string` - Адрес электронной почты.
`phone: string` - Номер телефона.
`address: string` - Адрес. 


## Модели данных
В данном проекте есть три модели для использования данных. 

### Buyer 
Хранение данных покупателей. 

#### Поля класса


#### Методы класса
`savepayment(payment: TPayment): void ` - Выбор способа оплаты.
`saveemail(email: string): void ` - Для введения электронного адреса.
`savephone(phone: string): void ` - Для введения номера телефона.
`saveaddress(address: string): void ` - Для введения адреса.
`buyervalidate(): { [key: string]: string } ` - Проверка на ошибки.
`savebuyerdata(): IBuyer ` - Сохранение данных.
`buyerclear(): void ` - Стирание данных.

### Products
Хранение данных товаров.

#### Поля класса

`protected products: IProduct[] = []` - Массив всех товаров.
`protected selectedProduct: IProduct | null = null` - Товар, выбранный для детального просмотра.

#### Методы класса

`saveproducts(items: IProduct[]): void` - Сохранение массива товаров полученного в параметрах метода.
`getproducts(): IProduct[]` - Получение массива товаров из модели.
`selectedproduct(product: IProduct): void ` - Отображение выбранного продукта

### ShoppingCart
Корзина покупателя. 

#### Поля класса

`private items: IProduct[] = [] ` — Массив товаров в корзине.

#### Методы класса

`additemshoppingcart(item: IProduct): void ` - Добавление товаров в корзину
`removeitemshoppingcart ` - Удаление товаров из корзины
`countitemshoppingcart ` - Количество товаров в корзине
`saveitemsshoppingcart` - Текущий список товаров
`totalpriceshoppingcart ` - Сумма корзины. 
`containsshoppingcart ` - Проверка товаров в корзине.
`clearshoppingcart ` - Очистка корзины. 

## Слой коммуникации
Работа с сервером.

#### Поля класса

`private api: IApi` - Хранение данных запроса. 

#### Методы класса

`async getProductList(): Promise<IProductList> ` - Возвращение списка товаров.
`async createOrder(order: IOrderRequest): Promise<IOrderResult> ` - Новый товар.

## Компоненты представления

### Cart
Класс для карточек товара. 

#### Поля класса

`protected fortitle: HTMLElement ` - Название товара.
`protected forprice: HTMLElement ` - Цена.
`protected forid: string = '' ` - ID.

#### Методы класса

`set id(value: string) ` - ID товара. 
`set title(value: string) ` - Заголовок. 
`set price(value: number | null) ` - Цена. 

### Cartcatolog 
Класс для католога. 

#### Поля класса

`protected forcategory: HTMLElement ` - Категория.
`protected forimage: HTMLImageElement ` - Изобрежние. 

#### Методы класса

`set category(value: string) ` - Установка категорий. 
`set image(value: string) ` - Установка изображений. 
`render(product: IProduct): HTMLElement ` - Получение объекта товара. 

### Cardpreview
Предпросмотр карточек

#### Поля класса

`protected fordescription: HTMLElement ` - Для описания. 
`protected forbutton: HTMLButtonElement ` - Для кнопки. 
`protected forcategory: HTMLElement ` - Для категории.
`protected forimage: HTMLImageElement ` - Для изображения. 

#### Методы класса

`set description(value: string) ` - Установка описания. 
`set category(value: string) ` - Установка категории. 
`set incart(value: boolean) ` - Установка нужного текста на кнопке.
`set image(value: string) ` - Установка изображения. 
`set price(value: number | null) ` - Установка цены. 

### Cardshoppingcart
Корзина с покупками.

#### Поля класса

`protected forindex: HTMLElement ` - Номер позиции. 
`protected fordeleteButton: HTMLButtonElement` - Кнопка удаления товара из корзины. 

#### Методы класса

`set index(value: number) ` - Установка номера элемента. 

## Формы
Класс для форм. 

### Поля класса

`protected forsubmit: HTMLButtonElement ` - Для отправки форм. 
`protected forerrors: HTMLElement ` - Для ошибок. 

#### Методы класса

`protected abstract onSubmit(): void ` - Обработка формы. 
`set valid(value: boolean) ` - Кнопка для оплаты. 
`set errors(value: string) ` - Сообщения об ошибках.

## Формы
Форма для контактов. 

### Поля класса

`protected foremail: HTMLInputElement ` - Для электронного адреса.
`protected forphone: HTMLInputElement ` - Для телефона.

#### Методы класса

`protected onSubmit(): void ` - Обработка кнопки. 
`set email(value: string) ` - Для электронного адреса.
`set phone(value: string) ` - Для телефона. 

###
Форма для заказа. 

### Поля класса

`protected forpaymentButtons: NodeListOf<HTMLButtonElement> ` - Для кнопки. 
`protected foraddress: HTMLInputElement ` - Для адреса. 

#### Методы класса

`this.forpaymentButtons.forEach(button => ` - Для обработки кнопки. 
`this.foraddress.addEventListener('input', () => ` - Для введения адреса. 
`protected onSubmit(): void ` - Обработка отправки. 
`set payment(value: TPayment) ` - Установка способа оплаты. 
`set address(value: string) ` - Отправка адреса. 

## Компоненты 

### Gallery 
Галерея. 

#### Поля класса

Наследуются из Component.

#### Методы класса

`set catalog(items: HTMLElement[]) ` - Установка католога. 

### Header
Заголовок. 

#### Поля класса

`protected cartbutton: HTMLButtonElement ` - Кнопка для корзины. 
`protected counterelement: HTMLElement ` - Счетчик товаров в корзине. 

#### Методы класса

`set counter(value: number) ` - Обновление счётчик товаров. 

### Model
Модальное окно. 

#### Поля класса

`protected forclosebutton: HTMLButtonElement ` - Кнопка закрытия. 
`protected forcontent: HTMLElement ` - Контент. 
`protected forhandleEscape: (event: KeyboardEvent) => void ` - Обработчик клавиши. 

#### Методы класса

`this.forcontent.addEventListener('click', (event) => event.stopPropagation())` - Установка содержимого. 

### Page
Страница. 

#### Поля класса

Наследуются из Component.

#### Методы класса 

`setView(view: 'catalog' | 'basket' | 'order'): void` - Установка страницы. 
`getCurrentView(): string ` - Установка текущей страницы. 

### ShoppingCartView
Корзина. 

#### Поля класса

`protected forlist: HTMLElement ` - Список товаров. 
`protected fortotal: HTMLElement ` - Общая стоимость товаров. 
`protected forbutton: HTMLButtonElement ` - Кнопка для оформления заказа. 

#### Методы класса 

`this.forbutton.addEventListener('click', () => ` - Обновление корзины. 

### Success
Успешное оформление заказа. 

#### Поля класса 

`protected fortotal: HTMLElement ` - Итоговая сумма заказа. 
`protected forcloseButton: HTMLButtonElement ` - Кнопка закрытия корзины. 

#### Методы класса 

`set total(value: number) ` - Отображение суммы в корзине. 

## Презентер 

### Модели

`Buyer ` - Данные покупателя. 
`Products ` - Данные товаров. 
`ShoppingCart ` - Данные про корзину покупателя. 
`WorkedAPI ` - Данные для работы с сервером. 

### Представления

`Contactform ` - Форма для данных покупателя. 
`Form ` - Общая форма. 
`Orderform ` - Форма для заказа. 
`Gallery ` - Галерея. 
`Header ` - Заголовок. 
`Model ` - Модальное окно. 
`Page ` - Страница. 
`ShoppingCartView ` - Корзина покупателя. 
`Success` - Успешная работа с заказом. 



































