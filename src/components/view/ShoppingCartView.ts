import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

// Интерфейс

interface ShoppingCartWiewData {
    items: HTMLElement[];
    total: number;
}

// Объявление класса

export class ShoppingCartView extends Component<ShoppingCartWiewData> {

// Поля класса

    protected forList: HTMLElement;
    protected forTotal: HTMLElement;
    protected forButton: HTMLButtonElement;

// Конструктор

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.forList = this.container.querySelector('.basket__list')!;
        this.forTotal = this.container.querySelector('.basket__price')!;
        this.forButton = this.container.querySelector('.basket__button')!;
        
// Обновление корзины

        this.forButton.addEventListener('click', () => {
            this.events.emit('basket:order');
        });
    }

    set shoppingCartItems(value: HTMLElement[]) {
        this.forList.replaceChildren(...value);
        this.setDisabled(this.forButton, value.length === 0);
    }

    set total(value: number) {
        this.setText(this.forTotal, `${value} синапсов`);
    }
}