import { userInfoType } from "./userInfoTypes"

export interface cartItemsType {
  id?: number | string;
  itemName?: string;
  itemPrice?: number;
  img1?: string;
  img2?: string;
  img3?: string;
  itemNum?: number;
  orderId?: string;
  status?: 0,
  totalPrice?: number;
}


export interface orderItemType {
  orderId?: string | null | undefined,
  itemInfo: cartItemsType[],
  status?: number,
}

export interface orderInfoType {
  userInfo?: userInfoType | null
  name?: string,
  email?: string,
  postalcode?: string,
  address?: string,
  tel?: string,
  deliveryDate: string,
  deliveryTime: string,
  payment: number,
  creditCardNum: string,
  selectPayment: boolean

}

export interface orderedItemType {
  itemInfo?: orderInfoType[],
  status?: number
  orderInfo?: orderInfoType,
  orderId?: string
}