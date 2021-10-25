
//新規登録時にDBに保存するユーザー情報の型
export interface userInfoType {
  email?: string;
  password?: string;
  name?: string;
  tel?: string;
  zipcode?: string;
  address?: string;
  uid?: string | null
}

//ログイン時に入力されるデータ型
export interface userLoginType {
  email: string;
  password: string;
}

//ユーザーをstoreで保持する際のデータ型
export interface userDataType {
  name: string | undefined;
  uid: string | null | undefined
}
