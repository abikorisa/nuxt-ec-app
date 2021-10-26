import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"
import { db } from "../plugins/firebase";
import { itemType } from '../types/itemInfoTypes'

@Module({ name: 'cart', namespaced: true, stateFactory: true })
export default class CartStore extends VuexModule {
}