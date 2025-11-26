import { Card } from './Card.ts';
import { IEvents } from '../../base/Events.ts';

// Объявление класса

export class CardShoppingCart extends Card { 

// Поля класса

    protected forIndex: HTMLElement; 
    protected forDeleteButton: HTMLButtonElement; 

// Конструктор

    constructor(container: HTMLElement, events: IEvents) { 
        super(container, events); 
        this.forIndex = this.container.querySelector('.basket__item-index') as HTMLElement; 
        this.forDeleteButton = this.container.querySelector('.basket__item-delete') as HTMLButtonElement; 
        this.forDeleteButton.addEventListener('click', (event) => { 
            event.stopPropagation();  
            this.events.emit('card:remove', { id: this.forId }); 
        }); 
    } 

// Установка значения номера элемента

    set index(value: number) { 
        if (value !== undefined) { 
            this.setText(this.forIndex, value.toString()); 
        } 
    } 
}