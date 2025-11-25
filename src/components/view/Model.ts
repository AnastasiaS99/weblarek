import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

// Объявление класса

export class Model extends Component<null> {

// Поля класса

    protected forclosebutton: HTMLButtonElement;
    protected forcontent: HTMLElement;
    protected forhandleEscape: (event: KeyboardEvent) => void;

// Конструктор

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.forclosebutton = this.container.querySelector('.modal__close')!;
        this.forcontent = this.container.querySelector('.modal__content')!;
        
        this.forhandleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                this.close();
            }
        };

        this.forclosebutton.addEventListener('click', () => {
            this.close();
        });
        
        this.container.addEventListener('click', (event) => {
            if (event.target === this.container) {
                this.close();
            }
        });
        
// Установка содержимого

        this.forcontent.addEventListener('click', (event) => event.stopPropagation());
    }

    set content(value: HTMLElement) {
        this.forcontent.replaceChildren(value);
    }

    open(): void {
        this.container.classList.add('modal_active');
        document.addEventListener('keydown', this.forhandleEscape);
    }

    close(): void {
        this.container.classList.remove('modal_active');
        document.removeEventListener('keydown', this.forhandleEscape);
    }
}