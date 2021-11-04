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
    this.orderId = orderInfo.orderId
    this.cartItems = orderInfo
    console.log(orderInfo.orderId)
    console.log(this.cartItems)
  }

  @Mutation
  private fetchCartItemsMut(itemInfoFromDB: orderItemType): void {
    this.cartItems = itemInfoFromDB
    console.log(this.cartItems)
  }

  @Mutation
  private updateOrderList(order: orderInfoType): void {
    //ここがpushじゃないと最新の物しか保持できない
    console.log(order)
    this.orderList.push(order)
    this.cartItems = null
    this.orderId = ''
    console.log(this.orderList)
  }

  @Mutation
  private fetchOrderdItemsMut(orderedItems: orderItemType[]): void {
    this.orderList = orderedItems
    //下記が空になっている
    console.log(this.orderList)
  }

  @Mutation
  private clearOrderInfoMut(): void {
    this.cartItems = null
    this.orderList = []
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
  //updateしたらカートを空にしないといけない
  public orderConfirm(order: orderInfoType) {
    if (this.orderId) {
      db.collection(`users/${UserStore.uid}/orders`)
        .doc(this.orderId)
        .update(order)
        .then(() => {
          this.updateOrderList(order)
        })
    }
  }

  @Action({ rawError: true })
  //DBからカート情報を取得する
  public async fetchCartItemsAct(): Promise<void> {
    await db.collection(`users/${UserStore.uid}/orders`)
      .get()
      .then((itemInfoAll) => {
        itemInfoAll.forEach(itemInfo => {
          let itemInfoFromDB: orderItemType = itemInfo.data()
          if (itemInfoFromDB.status === 0) {
            itemInfoFromDB = { ...itemInfoFromDB, orderId: itemInfo.id }
            this.fetchCartItemsMut(itemInfoFromDB)
          }
        })
      })
  }

  @Action({ rawError: true })
  public async fetchOrderdItemsAct(): Promise<void> {
    await db.collection(`users/${UserStore.uid}/orders`)
      .get()
      .then((itemInfoAll) => {
        let orderedItems: orderItemType[] = []
        if (itemInfoAll.docs.length > this.orderList.length) {
          itemInfoAll.forEach(itemInfo => {
            if (itemInfo.data().status === 1) {
              orderedItems.push(itemInfo.data())
            }
          })
        }
        this.fetchOrderdItemsMut(orderedItems)
      })
  }

  @Action({ rawError: true })
  public clearOrderInfoAct(): void {
    this.clearOrderInfoMut()
  }
}