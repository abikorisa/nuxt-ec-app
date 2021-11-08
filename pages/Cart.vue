<template>
  <div class="py-2">
    <div v-if="showCartPage" class="text-center">
      <h2>カートに入ってる商品</h2>
    </div>
    <div v-else class="text-center"><h2>注文内容</h2></div>
    <div
      v-if="!fetchCartItems"
      class="bg-white m-3 mx-auto rounded-md w-11/12 sm:w-96 md:w-3/5 "
    >
      <p class="p-10 text-center">現在カートに商品はありません</p>
    </div>
    <div v-else>
      <div class="bg-white m-3 mx-auto rounded-md w-11/12 sm:w-96 md:w-3/5">
        <ul v-for="item in fetchCartItems.itemInfo" :key="item.index">
          <li>
            <div class="py-2.5 flex px-6 justify-center">
              <img class="w-32 mr-1.5" :src="item.img1" />
              <div class="w-96">
                <p class="text-sm pb-1.5">商品名：{{ item.itemName }}</p>
                <p class="text-sm pb-1.5">数量：{{ item.itemNum }}個</p>
                <p class="text-sm pb-1.5">
                  単価：{{ item.itemPrice.toLocaleString("ja-JP") }}円(税抜)
                </p>
                <button
                  v-if="!showOrderForm"
                  class="bg-gray-200 text-sm py-1 px-4 rounded-md"
                  @click="deleteConfirm(item.id, item.itemName)"
                >
                  削除
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div
        class="py-2 bg-gray-200 m-3 mx-auto rounded-md text-center w-11/12 sm:w-96 md:w-3/5"
      >
        <p class="text-lg">
          合計金額：{{
            Math.floor(priceSum + priceSum * tax).toLocaleString("ja-JP")
          }}円
        </p>
        <p class="text-sm">
          (本体価格：{{ priceSum.toLocaleString("ja-JP") }}円、消費税：{{
            (priceSum * tax).toLocaleString("ja-JP")
          }}円)
        </p>
      </div>
    </div>
    <div v-if="!showOrderForm && fetchCartItems" class="flex justify-center">
      <button
        class="py-2 mx-2 px-10 bg-yellow-500 rounded-md text-white text-sm sm:text-md"
        @click="backToHome"
      >
        ショッピングを続ける
      </button>
      <button
        class="py-2 mx-2 px-10 bg-yellow-500 rounded-md text-white text-sm sm:text-md"
        @click="changeCartIntoForm"
      >
        注文に進む
      </button>
    </div>
    <OrderForm v-if="showOrderForm" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { CartStore } from "../store";
import { UserStore } from "../store";

type DataType = {
  showCartPage: boolean;
  showOrderForm: boolean;
  tax: number;
};

export default Vue.extend({
  data(): DataType {
    return {
      showCartPage: true,
      showOrderForm: false,
      tax: 0.1
    };
  },
  async fetch() {
    if (UserStore.userInfo) {
      const fetchItemInfo = CartStore.fetchCartItemsAct();
      await Promise.all([fetchItemInfo]);
    }
  },
  computed: {
    fetchCartItems() {
      return CartStore.cartItems;
    },
    priceSum() {
      let sum = 0;
      let cartItems = CartStore.cartItems.itemInfo;
      cartItems.forEach((item: any) => {
        sum += item.itemNum * item.itemPrice;
      });
      return sum;
    }
  },
  methods: {
    backToHome() {
      this.$router.push("/");
    },
    changeCartIntoForm(): void {
      this.showCartPage = false;
      this.showOrderForm = true;
    },
    deleteConfirm(id: string, name: string) {
      if (window.confirm(`${name}を削除してもよろしいですか？`)) {
        CartStore.deleteItemFromCartAct(id);
      }

      /*  //storeのcartitemsの中からidが一致するものを探す
      let cartItems = CartStore.cartItems.itemInfo;
      const deleteItem = cartItems.find((item: any) => item.id === id);
      //該当するidのindexを探し、spliceで削除する
      const deleteItemIndex = cartItems.indexOf(deleteItem);
      cartItems.splice(deleteItemIndex, 1);
      console.log(cartItems); */
    }
  }
});
</script>
