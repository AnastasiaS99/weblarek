import { Card } from './Card.ts';
import { IEvents } from '../../base/Events.ts';
import { IProduct } from '../../../types/index.ts';
import { categoryMap, CDN_URL } from '../../../utils/constants.ts';

// Объявление класса

export class CardCatolog extends Card { 

// Поля класса

    protected forCategory: HTMLElement;
    protected forImage: HTMLImageElement;

// Конструктор

    constructor(container: HTMLElement, events: IEvents) { 
        super(container, events); 
        
        this.forCategory = this.container.querySelector('.card__category') as HTMLElement;
        this.forImage = this.container.querySelector('.card__image') as HTMLImageElement;
         
        this.container.addEventListener('click', () => { 
            if (this.forId) { 
                this.events.emit('card:select', { id: this.forId }); 
            } 
        }); 
    } 

// Установка категорий

    set category(value: string) { 
        if (this.forCategory && value) { 
            this.forCategory.textContent = value; 
            const categoryClass = categoryMap[value as keyof typeof categoryMap] || 'card__category_other'; 
            this.forCategory.className = `card__category ${categoryClass}`; 
        } 
    } 

// Установка изображений

    set image(value: string) { 
        if (value && this.forImage) { 
            const cleanPath = value.startsWith('/') ? value.slice(1) : value; 
            const fullImageUrl = CDN_URL + '/' + cleanPath; 
            this.forImage.src = fullImageUrl; 
            this.forImage.alt = this.forTitle?.textContent || 'Изображение товара'; 
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