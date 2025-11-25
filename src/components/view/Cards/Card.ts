import { Component } from '../../base/Component.ts';
import { IProduct } from '../../../types/index.ts';
import { IEvents } from '../../base/Events.ts';

// Объявление класса

export abstract class Card extends Component<IProduct> { 

// Поля класса
  
    protected fortitle: HTMLElement; 
    protected forprice: HTMLElement; 
    protected forid: string = ''; 

// Конструктор

    constructor(container: HTMLElement, protected events: IEvents) { 
        super(container); 
        this.fortitle = this.container.querySelector('.card__title') as HTMLElement; 
        this.forprice = this.container.querySelector('.card__price') as HTMLElement; 
    } 

// Установка ID

    set id(value: string) { 
        this.forid = value; 
    } 

// Установка заголовка

    set title(value: string) { 
        this.setText(this.fortitle, value); 
    } 

// Установка цены

    set price(value: number | null) { 
        this.setText(this.forprice, value === null ? 'Бесценно' : `${value} синапсов`); 
    } 
}