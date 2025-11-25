import { Card } from './Card.ts';
import { IEvents } from '../../base/Events.ts';

// Объявление класса

export class Cardshoppingcart extends Card { 

// Поля класса

    protected forindex: HTMLElement; 
    protected fordeleteButton: HTMLButtonElement; 

// Конструктор

    constructor(container: HTMLElement, events: IEvents) { 
        super(container, events); 
        this.forindex = this.container.querySelector('.basket__item-index') as HTMLElement; 
        this.fordeleteButton = this.container.querySelector('.basket__item-delete') as HTMLButtonElement; 
        this.fordeleteButton.addEventListener('click', (event) => { 
            event.stopPropagation();  
            this.events.emit('card:remove', { id: this.forid }); 
        }); 
    } 

// Установка значения номера элемента

    set index(value: number) { 
        if (value !== undefined) { 
            this.setText(this.forindex, value.toString()); 
        } 
    } 
}