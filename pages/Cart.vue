<template>
  <div class="py-2">
    <div v-if="showCartPage" class="text-center">
      <h2>カートに入ってる商品</h2>
    </div>
    <div v-else class="text-center"><h2>注文内容</h2></div>
    <div
      v-if="!fetchCartItems"
      class="bg-white m-3 mx-auto rounded-md w-96 md:w-3/5 sm:w-4/5"
    >
      <p class="p-10 text-center">現在カートに商品はありません</p>
    </div>
    <div v-else class="bg-white m-3 mx-auto rounded-md w-96 md:w-3/5 sm:w-4/5">
      <ul v-for="item in fetchCartItems.itemInfo" :key="item.index">
        <li>
          <div class="py-2.5 flex px-12 justify-center">
            <img class="w-32" :src="item.img1" />
            <div class="w-96">
              <p>{{ item.itemName }}</p>
              <p>{{ item.itemPrice.toLocaleString("ja-JP") }}円</p>
              <p>{{ item.itemNum }}個</p>
              <p>
                {{
                  (
                    item.itemPrice * tax +
                    item.itemPrice * item.itemNum
                  ).toLocaleString("ja-JP")
                }}円
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="!showOrderForm && fetchCartItems" class="flex justify-center">
      <button
        class="py-2 mx-2 px-10 bg-yellow-500 rounded-md text-white"
        @click="backToHome"
      >
        ショッピングを続ける
      </button>
      <button
        class="py-2 mx-2 px-10 bg-yellow-500 rounded-md text-white"
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
    }
  },
  methods: {
    backToHome() {
      this.$router.push("/");
    },
    changeCartIntoForm(): void {
      this.showCartPage = false;
      this.showOrderForm = true;
    }
  }
});
</script>
