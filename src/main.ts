import './scss/styles.scss'; 
import { EventEmitter, IEvents } from './components/base/Events.ts'; 
import { Products } from './components/models/Products.ts'; 
import { ShoppingCart } from './components/models/ShoppingCart.ts'; 
import { Buyer } from './components/models/Buyer.ts'; 
import { WorkedAPI } from './components/base/WorkedAPI.ts'; 
import { Api } from './components/base/Api.ts'; 
import { API_URL } from './utils/constants.ts'; 
import { cloneTemplate } from './utils/utils.ts'; 
import { IProduct } from './types/index.ts'; 
import { Page } from './components/view/Page.ts';
import { Header } from './components/view/Header.ts'; 
import { ShoppingCartView } from './components/view/ShoppingCartView.ts'; 
import { Gallery } from './components/view/Gallery.ts'; 
import { Model } from './components/view/Model.ts'; 
import { CardCatolog } from './components/view/Cards/CardCatolog.ts'; 
import { CardPreview } from './components/view/Cards/CardPreview.ts'; 
import { CardShoppingCart } from './components/view/Cards/CardShoppingCart.ts'; 
import { OrderForm } from './components/view/Forms/OrderForm.ts'; 
import { ContactForm } from './components/view/Forms/ContactForm.ts'; 
import { Success } from './components/view/Success.ts'; 
import { TPayment } from './types/index.ts'; 


const events: IEvents = new EventEmitter(); 
const api = new Api(API_URL); 
const larekApi = new WorkedAPI(api); 
const tryproducts = new Products(events); 
const tryshoppingcart = new ShoppingCart(events); 
const trybuyer = new Buyer(events); 

// Элементы

const trycardcatalog = document.getElementById('card-catalog') as HTMLTemplateElement; 
const trycardpreview = document.getElementById('card-preview') as HTMLTemplateElement; 
const trycardshoppingcart = document.getElementById('card-basket') as HTMLTemplateElement; 
const tryshoppingcartbasket = document.getElementById('basket') as HTMLTemplateElement; 
const tryorder = document.getElementById('order') as HTMLTemplateElement; 
const trycontacts = document.getElementById('contacts') as HTMLTemplateElement; 
const trysuccess = document.getElementById('success') as HTMLTemplateElement; 

// Представления

const tryheader = new Header(document.querySelector('.header')!, events); 
const trygallery = new Gallery(document.querySelector('.gallery')!); 
const trymodal = new Model(document.getElementById('modal-container')!, events); 
const trypage = new Page(document.querySelector('.page')!, events);
const tryshoppingcartview = new ShoppingCartView(cloneTemplate(tryshoppingcartbasket), events); 
const tryorderform = new OrderForm(cloneTemplate(tryorder), events); 
const trycontactform = new ContactForm(cloneTemplate(trycontacts), events); 


// Загрузка галерии  

events.on('products:visiable', () => { 
    const products = tryproducts.getProducts(); 
    const cards = products.map(product => { 
        const card = new CardCatolog(cloneTemplate(trycardcatalog), events); 
        return card.render(product); 
    }); 
    trygallery.catalog = cards; 
}); 

// Выбранный товар

events.on('product:changed', (data: { product: IProduct }) => { 
    const preview = new CardPreview(cloneTemplate(trycardpreview), events); 
    const incart = tryshoppingcart.containsShoppingCart(data.product.id); 
     
    preview.id = data.product.id; 
    preview.title = data.product.title; 
    preview.price = data.product.price; 
    preview.description = data.product.description || ''; 
    preview.category = data.product.category || ''; 
    preview.image = data.product.image || ''; 
    preview.incart = incart; 
     
    trymodal.content = preview.render(); 
    trymodal.open(); 
}); 

// Обновление корзины

events.on('cart:changed', () => { 
    tryheader.counter = tryshoppingcart.countItemShoppingCart(); 

    const shoppincartitems = tryshoppingcart.saveItemsShoppingCart().map((item, index) => { 
        const card = new CardShoppingCart(cloneTemplate(trycardshoppingcart), events); 
        card.id = item.id; 
        card.title = item.title; 
        card.price = item.price; 
        card.index = index + 1; 
        return card.render(); 
    }); 
     
    tryshoppingcartview.shoppingCartItems = shoppincartitems; 
    tryshoppingcartview.total = tryshoppingcart.totalPriceShoppingCart(); 
}); 

// Обработка данных покупателя

events.on('buyer:changed', (data: { field?: string }) => { 
    const errors = trybuyer.buyerValidate(); 
    const buyerdatas = trybuyer.saveBuyerData(); 

    if (!data.field || data.field === 'payment' || data.field === 'address') {
        tryorderform.payment = buyerdatas.payment;
        
        let orderError = '';
        if (errors.payment) {
            orderError = errors.payment;
        } else if (errors.address) {
            orderError = errors.address;
        }
        tryorderform.errors = orderError;
        
        tryorderform.valid = !errors.payment && !errors.address;
    }
    if (!data.field || data.field === 'email' || data.field === 'phone') {
        let contactsError = '';
        if (errors.email) {
            contactsError = errors.email;
        } else if (errors.phone) {
            contactsError = errors.phone;
        }
        trycontactform.errors = contactsError;
        trycontactform.valid = !errors.email && !errors.phone;
    }
}); 

// Выбор карточки

events.on('card:select', (data: { id: string }) => { 
    const product = tryproducts.getProducts().find(item => item.id === data.id); 
    if (product) { 
        tryproducts.selectProduct(product); 
    } 
}); 

// Предварительный просмотр товара

events.on('preview:button:click', (data: { id: string }) => { 
    const product = tryproducts.getProducts().find(item => item.id === data.id); 
    if (product) { 
        if (tryshoppingcart.containsShoppingCart(product.id)) { 
            tryshoppingcart.removeItemShoppingCart(product.id); 
        } else { 
            tryshoppingcart.addItemShoppingCart(product); 
        } 
        trymodal.close(); 
    } 
}); 

// Удаление товара из корзины

events.on('card:remove', (data: { id: string }) => { 
    tryshoppingcart.removeItemShoppingCart(data.id); 
}); 

// Открытие корзины

events.on('basket:open', () => {
    trymodal.content = tryshoppingcartview.render();
    trymodal.open();
    trypage.setView('basket');
});

// Оформление заказа

events.on('basket:order', () => {
    const buyerData = trybuyer.saveBuyerData(); 
    trymodal.content = tryorderform.render({ 
        payment: buyerData.payment, 
        address: buyerData.address 
    });

    tryorderform.valid = false;
    
    trypage.setView('order');
    trymodal.open();
});

// Закрытие окна с данными

events.on('modal:close', () => {
    trypage.setView('catalog');
});

// Обработка успешного завершения

events.on('success:close', () => {
    trymodal.close();
    trypage.setView('catalog');
});

// Отправление заказа

events.on('order:submit', () => { 
    const buyerData = trybuyer.saveBuyerData(); 
    trycontactform.email = buyerData.email; 
    trycontactform.phone = buyerData.phone; 
     
    const errors = trybuyer.buyerValidate(); 
    const contactsErrors = [errors.email, errors.phone].filter(Boolean).join(', ');
    trycontactform.valid = !errors.email && !errors.phone; 
    trycontactform.errors = contactsErrors;
     
    trymodal.content = trycontactform.render(); 
}); 

// Изменение оплаты 

events.on('order:paymentChange', (data: { payment: TPayment }) => { 
    trybuyer.savePayment(data.payment); 
    events.emit('buyer:changed', { field: 'payment' });
}); 

// Изменение адреса

events.on('order:addressChange', (data: { address: string }) => { 
    trybuyer.saveAddress(data.address); 
    events.emit('buyer:changed', { field: 'address' });
}); 

// Изменение электронного адреса

events.on('contacts:emailChange', (data: { email: string }) => { 
    trybuyer.saveEmail(data.email); 
    events.emit('buyer:changed', { field: 'email' });
}); 

// Изменение телефона

events.on('contacts:phoneChange', (data: { phone: string }) => { 
    trybuyer.savePhone(data.phone); 
    events.emit('buyer:changed', { field: 'phone' });
}); 

// Отправка данных

events.on('contacts:submit', async () => { 

    try { 
        const total = tryshoppingcart.totalPriceShoppingCart(); 
        const orderResult = await larekApi.createOrder({ 
            ...trybuyer.saveBuyerData(), 
            items: tryshoppingcart.saveItemsShoppingCart().map(item => item.id), 
            total: total 
        }); 

        const success = new Success(cloneTemplate(trysuccess), events); 
        success.total = orderResult.total; 
        trymodal.content = success.render(); 

        tryshoppingcart.clearShoppingCart(); 
        trybuyer.buyerClear(); 

    } catch (error) { 
        console.error('Order error:', error); 
        trycontactform.errors = 'Ошибка при оформлении заказа';
    } 
}); 

// Завершение 

events.on('success:close', () => { 
    trymodal.close(); 
}); 

async function init() { 
    try { 
        const productList = await larekApi.getProductList(); 
        tryproducts.saveProducts(productList.items); 
    } catch (error) { 
        console.error('Failed to load products:', error); 
    } 
} 

init();