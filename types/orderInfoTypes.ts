import { userInfoType } from "./userInfoTypes"
import { itemType } from "./itemInfoTypes"

export interface cartItemsType {
  id?: number | string;
  itemName?: string;
  itemPrice?: number;
  img1?: string;
  img2?: string;
  img3?: string;
  itemNum?: number;
  itemText?: string;
  status?: 0,
  orderId?: string;
  /* orderId?: string;
  totalPrice?: number; */
}

//注文確定時のデータ型
export interface orderComfirm {

}

export interface orderItemType {
  orderId?: string | null | undefined;
  itemInfo?: cartItemsType[] | undefined;
  status?: number
  userId?: string | null | undefined;
}

export interface orderInfoType {
  //userInfo?: userInfoType | null
  name?: string,
  email?: string,
  zipcode?: string,
  address?: string,
  itemInfo?: itemType[] | null,
  tel?: string,
  deliveryDate?: string,
  deliveryTime?: string,
  payment?: number,
  creditCardNum?: string,
  selectPayment?: boolean
  status: number
  orderId: string | null | undefined;
  userId?: string | null | undefined;
}

export interface orderedItemType {
  itemInfo?: orderInfoType[],
  status?: number
  orderInfo?: orderInfoType,
  orderId?: string
}