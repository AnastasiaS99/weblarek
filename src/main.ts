import './scss/styles.scss';
import { apiProducts } from './utils/data'
import { Products } from './components/models/Products';
import { ShoppingCart } from './components/models/ShoppingCart';
import { Buyer } from './components/models/Buyer';
import { WorkedAPI } from './components/base/WorkedAPI';
import { Api } from './components/base/Api';
import { API_URL} from './utils/constants'

// Тестирование товаров
const tryProducts = new Products();
tryProducts.saveproducts(apiProducts.items);
console.log("Товары по катологу ", tryProducts.getproducts());
console.log("Выбранный товар", tryProducts.getproductsSelect());

// Тестируем корзину покупателя

const tryShoppingCart = new ShoppingCart();

// Добавление товара в корзину

tryShoppingCart.addProduct(apiProducts.items[0]);
console.log("Товары в корзине ", tryShoppingCart.getProducts());
console.log("Цена корзины", tryShoppingCart.getTotal());
console.log("Количество товаров в корзине ", tryShoppingCart.getCount());
console.log("Очистка корзины"); tryShoppingCart.clearShoppingCart();

// Тестирование покупателей

const tryBuyer = new Buyer();

tryBuyer.saveBuyer({payment: 'card', address: 'г. Москва'});
tryBuyer.saveBuyer({email: 'Buyer@mail.ru', phone: '+7000000000'});
console.log('Данные покупателя:', tryBuyer.getBuyer());
console.log('Проверка ошибок', tryBuyer.validateBuyer());

// Тестирование API 

const tryApi = new Api(API_URL);
const tryWorkedAPI = new WorkedAPI(tryApi);
const productCatalog = new Products();

tryWorkedAPI.fetchProducts()
  .then(products => {
    productCatalog.saveproducts(products.items);
    console.log(productCatalog.getproducts());
  })
  .catch((err: unknown) => console.error("Произошла ошибка при загрузке: ", err));