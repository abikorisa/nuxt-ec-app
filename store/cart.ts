import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"
import { cartItemsType, orderItemType, orderInfoType } from "../types/orderInfoTypes";
import { db } from "../plugins/firebase";
import { itemType } from '../types/itemInfoTypes'
import { UserStore } from '../store';

@Module({ name: 'cart', namespaced: true, stateFactory: true })
export default class CartStore extends VuexModule {

  /* ___ここからstateの記述_______________________ */
  public cartItems: any | null = null
  public orderId: string | null | undefined = null
  public orderList: any = []


  /* ___ここからgettersの記述_______________________ */

  //既にカート情報があるかの確認
  public get getOrderId(): string | null | undefined {
    return this.orderId
  }


  /* ___ここからmutationsの記述_______________________ */
  @Mutation
  private setItemtoCart(orderInfo: orderItemType): void {
    console.log(orderInfo)
    this.orderId = orderInfo.orderId
    this.cartItems = orderInfo
    console.log(orderInfo)
    console.log(this.cartItems)
  }

  @Mutation
  private updateOrderList(order: orderInfoType): void {
    //ここがpushじゃないと最新の物しか保持できない
    this.orderList.push(order)
    console.log(this.orderList)
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
      if (this.orderId) {
        console.log('既存のorderに追加します')
        console.log(this.orderId)
        let newCartItems = this.cartItems
        if (newCartItems !== null && newCartItems !== undefined) {
          if (newCartItems.itemInfo !== null && newCartItems.itemInfo !== undefined)
            newCartItems.itemInfo.push(item)
          db.collection(`users/${UserStore.uid}/orders`)
            .doc(this.orderId)
            .update({ itemInfo: [...newCartItems.itemInfo] })
            .then(() => {
              let orderInfo = { ...newCartItems, orderId: this.orderId }
              this.setItemtoCart(orderInfo)
            })
        }
      } else {
        console.log('新たにorderを作成します')
        console.log(this.orderId)
        db.collection(`users/${UserStore.uid}/orders`)
          .add(order)
          .then((doc) => {
            let orderInfo = { ...order, orderId: doc.id }
            this.setItemtoCart(orderInfo)
          })
      }
    }
  }
  @Action({ rawError: true })
  public updateOrder(order: orderInfoType) {
    if (this.orderId) {
      db.collection(`users/${UserStore.uid}/orders`)
        .doc(this.orderId)
        .update(order)
        .then(() => {
          console.log(order)
          this.updateOrderList(order)
        })
    }
  }
}