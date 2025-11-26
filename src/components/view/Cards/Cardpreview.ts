import { Card } from './Card.ts'; 
import { IEvents } from '../../base/Events.ts'; 
import { categoryMap, CDN_URL } from '../../../utils/constants.ts'; 

// Объявление класса

export class CardPreview extends Card { 

// Поля класса 

    protected forDescription: HTMLElement; 
    protected forButton: HTMLButtonElement; 
    protected forCategory: HTMLElement; 
    protected forImage: HTMLImageElement; 

// Конструктор

    constructor(container: HTMLElement, events: IEvents) { 
        super(container, events); 
        this.forDescription = this.container.querySelector('.card__text') as HTMLElement; 
        this.forButton = this.container.querySelector('.card__button') as HTMLButtonElement; 
        this.forCategory = this.container.querySelector('.card__category') as HTMLElement; 
        this.forImage = this.container.querySelector('.card__image') as HTMLImageElement; 
         
        this.forButton.addEventListener('click', () => { 
            if (this.forButton.disabled) { 
                return; 
            } 
            this.events.emit('preview:button:click', { id: this.forId }); 
        }); 
    } 

// Описание

    set description(value: string) { 
        if (this.forDescription) { 
            this.forDescription.textContent = value; 
        } 
    } 

// Категория

    set category(value: string) { 
        if (this.forCategory) { 
            this.forCategory.textContent = value; 
            const categoryClass = categoryMap[value as keyof typeof categoryMap] || 'card__category_other'; 
            this.forCategory.className = `card__category ${categoryClass}`; 
        } 
    } 

// Текст кнопки в зависимости от состояния карзины 

    set incart(value: boolean) { 
        if (this.forButton.disabled) { 
            return; 
        } 

        if (value) { 
            this.forButton.textContent = 'Удалить из корзины'; 
        } else { 
            this.forButton.textContent = 'В корзину'; 
        } 
    } 

// Установка изображения
    
    set image(value: string) { 
        if (value && this.forImage) { 
            const cleanPath = value.startsWith('/') ? value.slice(1) : value; 
            const fullImageUrl = CDN_URL + '/' + cleanPath; 
            this.forImage.src = fullImageUrl; 
            this.forImage.alt = this.forTitle?.textContent || 'Изображение товара'; 
        } 
    } 

// Установка цены

    set price(value: number | null) { 
        if (value === null) { 
            this.setText(this.forPrice, 'Бесценно'); 
            this.forButton.textContent = 'Недоступно'; 
            this.setDisabled(this.forButton, true); 
            this.forButton.classList.add('card__button_disabled'); 
        } else { 
            this.setText(this.forPrice, `${value} синапсов`); 
            this.setDisabled(this.forButton, false); 
            this.forButton.classList.remove('card__button_disabled'); 
        } 
    } 
}