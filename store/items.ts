import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"
import { db } from "../plugins/firebase";
import { itemType } from '../types/itemInfoTypes'

@Module({ name: 'items', namespaced: true, stateFactory: true })
export default class ItemsStore extends VuexModule {

  /* ___ここからstateの記述_______________________ */
  public items: itemType[] = []



  /* ___ここからgettersの記述_______________________ */

  //storeから商品データの取得
  public get getItemList() {
    return this.items
  }


  /* ___ここからmutationsの記述_______________________ */
  @Mutation
  private setItemList(item: itemType): void {
    this.items.push(item)
  }


  /* ____ここからactionsの記述________________________ */

  //DBから商品情報の取得
  @Action({ rawError: true })
  public async fetchItemList(): Promise<void> {
    await db.collection(`admin/PjZocn2dcSWktDeHgmaO/itemList`)
      .get().then(items => {
        items.forEach(i => {
          const item: itemType = i.data()
          this.setItemList(item)
        })
      })
  }
}