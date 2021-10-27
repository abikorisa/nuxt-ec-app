import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"
import { cartItemsType, orderItemType } from "../types/orderInfoTypes";
import { db } from "../plugins/firebase";
import { itemType } from '../types/itemInfoTypes'
import { UserStore } from '../store';
import { directive } from 'vue-awesome-swiper';

@Module({ name: 'cart', namespaced: true, stateFactory: true })
export default class CartStore extends VuexModule {

  /* ___ここからstateの記述_______________________ */
  public cartItems: any[] = []


  /* ___ここからgettersの記述_______________________ */

  //既にカート情報があるかの確認
  /* public get getOrderId(): string | undefined {
    if (this.cartItems[0].userId != undefined) {
      return this.cartItems[0].userId
    }
  } */


  /* ___ここからmutationsの記述_______________________ */
  @Mutation
  private setItemtoCart(orderInfo: orderItemType): void {
    this.cartItems.push(orderInfo)
    console.log(this.cartItems[0].userId)
  }


  /* ____ここからactionsの記述________________________ */
  @Action({ rawError: true })
  public addItemToCart(item: itemType): void {
    item.id = new Date().getTime().toString(16) +
      Math.floor(1000 * Math.random()).toString(16)
    let userId = UserStore.uid
    let order = {
      userId: userId,
      itemInfo: [item],
      status: 0
    }
    if (userId) {
      if (this.cartItems[0].orderId == undefined) {
        console.log('新たにorderを作成します')
        db.collection(`users/${UserStore.uid}/orders`)
          .add(order)
          .then((doc) => {
            let orderInfo = { ...order, orderId: doc.id }
            this.setItemtoCart(orderInfo)
          })
      } else {
        console.log('既存のorderに追加します')
        let newCartItems = this.cartItems
        newCartItems[0].itemInfo.push(item)
        db.collection(`users/${UserStore.uid}/orders`)
          .doc(this.cartItems[0].orderId)
          .update({ itemInfo: [...newCartItems[0].itemInfo] })
          .then(() => {
            let orderInfo = { ...newCartItems[0], orderId: !this.cartItems[0].orderId }
            this.setItemtoCart(orderInfo)
          })
      }
    }
  }
}