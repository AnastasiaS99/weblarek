import { Component } from '../../base/Component.ts';
import { IProduct } from '../../../types/index.ts';
import { IEvents } from '../../base/Events.ts';

// Объявление класса

export abstract class Card extends Component<IProduct> { 

// Поля класса
  
    protected forTitle: HTMLElement; 
    protected forPrice: HTMLElement; 
    protected forId: string = ''; 

// Конструктор

    constructor(container: HTMLElement, protected events: IEvents) { 
        super(container); 
        this.forTitle = this.container.querySelector('.card__title') as HTMLElement; 
        this.forPrice = this.container.querySelector('.card__price') as HTMLElement; 
    } 

// Установка ID

    set id(value: string) { 
        this.forId = value; 
    } 

// Установка заголовка

    set title(value: string) { 
        this.setText(this.forTitle, value); 
    } 

// Установка цены

    set price(value: number | null) { 
        this.setText(this.forPrice, value === null ? 'Бесценно' : `${value} синапсов`); 
    } 
}