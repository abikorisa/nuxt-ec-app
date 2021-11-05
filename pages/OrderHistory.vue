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
      class="bg-white m-3 mx-auto rounded-md w-11/12 sm:w-96 md:w-3/5"
    >
      <div>
        <div class="bg-gray-200 p-2 flex justify-between items-center">
          <div>
            <p class="text-xs">注文日：{{ item.orderDate }}</p>
            <p class="text-xs">配送日：{{ item.deliveryDate }}</p>
            <p class="text-xs">合計金額：円</p>
          </div>
          <div>
            <button
              v-if="item.status === 1"
              class="text-xs bg-gray-300 py-1.5 px-2 rounded-md"
            >
              注文キャンセル
            </button>
            <p
              v-else-if="item.status === 2"
              class="text-xs bg-white boder-gray-300 py-1.5 px-2 "
            >
              キャンセル済み
            </p>
          </div>
        </div>
        <ul v-for="item in item.itemInfo" :key="item.index">
          <li>
            <div class="py-2.5 flex px-6 justify-center border-t">
              <img class="w-32 mr-1.5" :src="item.img1" />
              <div class="w-96">
                <p class="text-sm pb-1.5">商品名：{{ item.itemName }}</p>
                <p class="text-sm pb-1.5">数量：{{ item.itemNum }}個</p>
                <p class="text-sm pb-1.5">
                  単価：{{ item.itemPrice.toLocaleString("ja-JP") }}円(税抜)
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
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
