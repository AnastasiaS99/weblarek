import { Card } from './Card.ts';
import { IEvents } from '../../base/Events.ts';
import { IProduct } from '../../../types/index.ts';
import { categoryMap, CDN_URL } from '../../../utils/constants.ts';

// Объявление класса

export class Cardcatolog extends Card { 

// Поля класса

    protected forcategory: HTMLElement;
    protected forimage: HTMLImageElement;

// Конструктор

    constructor(container: HTMLElement, events: IEvents) { 
        super(container, events); 
        
        this.forcategory = this.container.querySelector('.card__category') as HTMLElement;
        this.forimage = this.container.querySelector('.card__image') as HTMLImageElement;
         
        this.container.addEventListener('click', () => { 
            if (this.forid) { 
                this.events.emit('card:select', { id: this.forid }); 
            } 
        }); 
    } 

// Установка категорий

    set category(value: string) { 
        if (this.forcategory && value) { 
            this.forcategory.textContent = value; 
            const categoryClass = categoryMap[value as keyof typeof categoryMap] || 'card__category_other'; 
            this.forcategory.className = `card__category ${categoryClass}`; 
        } 
    } 

// Установка изображений

    set image(value: string) { 
        if (value && this.forimage) { 
            const cleanPath = value.startsWith('/') ? value.slice(1) : value; 
            const fullImageUrl = CDN_URL + '/' + cleanPath; 
            this.forimage.src = fullImageUrl; 
            this.forimage.alt = this.fortitle?.textContent || 'Изображение товара'; 
        } 
    } 

// Получение объекта товара

    render(product: IProduct): HTMLElement { 
        this.id = product.id; 
        this.title = product.title; 
        this.price = product.price; 
        this.category = product.category;
        this.image = product.image;
         
        return this.container; 
    } 
}