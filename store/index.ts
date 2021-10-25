import { Store } from 'vuex';
import { initialiseStores } from '../utils/store-accessor';
import { Context } from "@nuxt/types";
const initializer = (store: Store<any>) => initialiseStores(store)
export const plugins = [initializer]
export * from '~/utils/store-accessor'

