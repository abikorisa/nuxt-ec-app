import firebase, { auth, db } from '../plugins/firebase';
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"
import { userInfoType, userDataType } from '../types/userInfoTypes'

@Module({ name: 'auth', namespaced: true, stateFactory: true })
export default class UserStore extends VuexModule {

  /* ___ここからstateの記述_______________________ */
  public userInfo: userInfoType | null = null
  public uid: string | null | undefined = null




  /* ___ここからgettersの記述_______________________ */

  //uidを取得する
  public get getUid(): string | null | undefined {
    return this.uid
  }




  /* ___ここからmutationsの記述_______________________ */

  //ユーザー情報を保持する
  @Mutation
  private setUserInfo(user: userInfoType): void {
    this.uid = user.uid
    this.userInfo = user
  }



  //ユーザー情報を削除する
  @Mutation
  private clearUserInfo(): void {
    this.uid = null
    this.userInfo = null
  }



  /* ____ここからactionsの記述________________________ */

  //ログイン
  @Action({ rawError: true })
  public async register(userInfo: userInfoType): Promise<void> {
    const user: userInfoType = userInfo
    this.setUserInfo(user)
  }

  @Action({ rawError: true })
  public async login(userInfo: userInfoType): Promise<void> {
    let uid = userInfo.uid
    db.collection(`users/${uid}/userInfo`)
      .get().then((snapShot) => {
        snapShot.forEach((doc) => {
          let user: userInfoType = doc.data()
          this.setUserInfo(user)
        })
      })
  }


  //会員情報をDBに追加する処理
  @Action({ rawError: true })
  public async addUserInfo(userInfo: userInfoType) {
    db.collection(`users/${userInfo.uid}/userInfo`).add(userInfo).then(() => {
      console.log('Actionsが稼働')
    })
  }

  //ログアウト
  @Action({ rawError: true })
  public async logout(): Promise<void> {
    await auth.signOut();
    this.clearUserInfo();
  }
}