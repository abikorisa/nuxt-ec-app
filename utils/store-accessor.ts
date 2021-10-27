import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import auth from '../store/auth';
import items from '../store/items';
import cart from '../store/cart';

// eslint-disable-next-line import/no-mutable-exports
let UserStore: auth;
let ItemsStore: items;
let CartStore: cart;

function initialiseStores(store: Store<any>): void {
  UserStore = getModule(auth, store);
  ItemsStore = getModule(items, store)
  CartStore = getModule(cart, store)
}

export { initialiseStores, UserStore, ItemsStore, CartStore }