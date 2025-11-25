import { Card } from './Card.ts'; 
import { IEvents } from '../../base/Events.ts'; 
import { categoryMap, CDN_URL } from '../../../utils/constants.ts'; 

// Объявление класса

export class Cardpreview extends Card { 

// Поля класса 

    protected fordescription: HTMLElement; 
    protected forbutton: HTMLButtonElement; 
    protected forcategory: HTMLElement; 
    protected forimage: HTMLImageElement; 

// Конструктор

    constructor(container: HTMLElement, events: IEvents) { 
        super(container, events); 
        this.fordescription = this.container.querySelector('.card__text') as HTMLElement; 
        this.forbutton = this.container.querySelector('.card__button') as HTMLButtonElement; 
        this.forcategory = this.container.querySelector('.card__category') as HTMLElement; 
        this.forimage = this.container.querySelector('.card__image') as HTMLImageElement; 
         
        this.forbutton.addEventListener('click', () => { 
            if (this.forbutton.disabled) { 
                return; 
            } 
            this.events.emit('preview:button:click', { id: this.forid }); 
        }); 
    } 

// Описание

    set description(value: string) { 
        if (this.fordescription) { 
            this.fordescription.textContent = value; 
        } 
    } 

// Категория

    set category(value: string) { 
        if (this.forcategory) { 
            this.forcategory.textContent = value; 
            const categoryClass = categoryMap[value as keyof typeof categoryMap] || 'card__category_other'; 
            this.forcategory.className = `card__category ${categoryClass}`; 
        } 
    } 

// Текст кнопки в зависимости от состояния карзины 

    set incart(value: boolean) { 
        if (this.forbutton.disabled) { 
            return; 
        } 

        if (value) { 
            this.forbutton.textContent = 'Удалить из корзины'; 
        } else { 
            this.forbutton.textContent = 'В корзину'; 
        } 
    } 

// Установка изображения
    
    set image(value: string) { 
        if (value && this.forimage) { 
            const cleanPath = value.startsWith('/') ? value.slice(1) : value; 
            const fullImageUrl = CDN_URL + '/' + cleanPath; 
            this.forimage.src = fullImageUrl; 
            this.forimage.alt = this.fortitle?.textContent || 'Изображение товара'; 
        } 
    } 

// Установка цены

    set price(value: number | null) { 
        if (value === null) { 
            this.setText(this.forprice, 'Бесценно'); 
            this.forbutton.textContent = 'Недоступно'; 
            this.setDisabled(this.forbutton, true); 
            this.forbutton.classList.add('card__button_disabled'); 
        } else { 
            this.setText(this.forprice, `${value} синапсов`); 
            this.setDisabled(this.forbutton, false); 
            this.forbutton.classList.remove('card__button_disabled'); 
        } 
    } 
}