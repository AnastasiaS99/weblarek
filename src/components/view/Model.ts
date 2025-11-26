import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

// Объявление класса

export class Model extends Component<null> {

// Поля класса

    protected forCloseButton: HTMLButtonElement;
    protected forContent: HTMLElement;
    protected forHandleEscape: (event: KeyboardEvent) => void;

// Конструктор

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.forCloseButton = this.container.querySelector('.modal__close')!;
        this.forContent = this.container.querySelector('.modal__content')!;
        
        this.forHandleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                this.close();
            }
        };

        this.forCloseButton.addEventListener('click', () => {
            this.close();
        });
        
        this.container.addEventListener('click', (event) => {
            if (event.target === this.container) {
                this.close();
            }
        });
        
// Установка содержимого

        this.forContent.addEventListener('click', (event) => event.stopPropagation());
    }

    set content(value: HTMLElement) {
        this.forContent.replaceChildren(value);
    }

    open(): void {
        this.container.classList.add('modal_active');
        document.addEventListener('keydown', this.forHandleEscape);
    }

    close(): void {
        this.container.classList.remove('modal_active');
        document.removeEventListener('keydown', this.forHandleEscape);
    }
}