import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import auth from '../store/auth';
import items from '../store/items';

// eslint-disable-next-line import/no-mutable-exports
let UserStore: auth;
let ItemsStore: items;

function initialiseStores(store: Store<any>): void {
  UserStore = getModule(auth, store);
  ItemsStore = getModule(items, store)
}

export { initialiseStores, UserStore, ItemsStore }