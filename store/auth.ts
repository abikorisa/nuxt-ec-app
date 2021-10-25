import firebase, { auth, db } from '../plugins/firebase';
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"
import { userInfoType, userDataType } from '../types/userInfoTypes'

@Module({ name: 'auth', namespaced: true, stateFactory: true })
export default class UserStore extends VuexModule {

  /* ___ここからstateの記述___ */
  public login_user: userDataType | null = null
  public userInfo: userInfoType | null = null
  public uid: string | null | undefined = null




  /* ___ここからgettersの記述___ */

  //uidを取得する
  public get getUid(): string | null | undefined {
    return this.uid
  }




  /* ___ここからmutationsの記述_______________________ */

  //ユーザー情報を保持する
  @Mutation
  private setUserInfo(user: userDataType): void {
    this.uid = user.uid
    this.login_user = user
  }

  //ユーザー情報を削除する
  @Mutation
  private clearUserInfo(userInfo: null): void {
    this.uid = null
    this.login_user = null
  }



  /* ____ここからactionsの記述________________________ */

  //ログイン
  @Action({ rawError: true })
  public async login(userInfo: userInfoType): Promise<void> {
    const user = {
      name: userInfo.name,
      uid: userInfo.uid
    }
    this.setUserInfo(user)
  }

  //ログアウト
  @Action({ rawError: true })
  public async logout(): Promise<void> {
    await auth.signOut();
    this.clearUserInfo(null);
  }
}