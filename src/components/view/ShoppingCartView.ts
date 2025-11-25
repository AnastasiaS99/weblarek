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

    protected forlist: HTMLElement;
    protected fortotal: HTMLElement;
    protected forbutton: HTMLButtonElement;

// Конструктор

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.forlist = this.container.querySelector('.basket__list')!;
        this.fortotal = this.container.querySelector('.basket__price')!;
        this.forbutton = this.container.querySelector('.basket__button')!;
        
// Обновление корзины

        this.forbutton.addEventListener('click', () => {
            this.events.emit('basket:order');
        });
    }

    set shoppincartitems(value: HTMLElement[]) {
        this.forlist.replaceChildren(...value);
        this.setDisabled(this.forbutton, value.length === 0);
    }

    set total(value: number) {
        this.setText(this.fortotal, `${value} синапсов`);
    }
}