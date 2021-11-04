<template>
  <div class="py-2">
    <div class="text-center">
      <h2>注文履歴</h2>
    </div>
    <div
      v-if="fetchOrderItems.length === 0"
      class="bg-white m-3 mx-auto rounded-md w-96 md:w-3/5 sm:w-4/5"
    >
      <p class="p-10 text-center">現在カートに商品はありません</p>
    </div>
    <div
      v-else
      v-for="item in fetchOrderItems"
      :key="item.index"
      class="bg-white m-3 mx-auto rounded-md w-96 md:w-3/5 sm:w-4/5"
    >
      <ul v-for="item in item.itemInfo" :key="item.index">
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { CartStore } from "../store";
import { UserStore } from "../store";

export default Vue.extend({
  async fetch() {
    if (UserStore.userInfo) {
      const fetchOrderInfo = CartStore.fetchOrderdItemsAct();
      await Promise.all([fetchOrderInfo]);
    }
  },
  data() {
    return {
      tax: 0.1
    };
  },
  computed: {
    fetchOrderItems() {
      return CartStore.orderList;
    }
  }
});
</script>
