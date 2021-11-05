<template>
  <div class="py-2">
    <div class="text-center"><h2>商品詳細</h2></div>
    <div
      class="bg-white m-3 mx-auto rounded-md sm:flex justify-center w-96 md:w-3/5 sm:w-4/5"
    >
      <div class="p-3">
        <img class="pb-3" :src="url" />
        <div class="flex justify-between">
          <img class="w-28 sm:w-24" :src="item.img1" @click="changeImage1" />
          <img class="w-28 sm:w-24" :src="item.img2" @click="changeImage2" />
          <img class="w-28 sm:w-24" :src="item.img3" @click="changeImage3" />
        </div>
      </div>
      <div class="p-3">
        <div class="border-dashed border-b border-light-blue-500 mb-3">
          <p class="text-2xl py-2">{{ item.itemName }}</p>
          <p class="text-right text-xl py-2">
            {{ item.itemPrice.toLocaleString("ja") }}円(税抜)
          </p>
        </div>
        <div class="text-center my-6">
          <span
            class="inline-block -mx-1 p-2.5 bg-gray-200 hover:bg-gray-300 border border-gray-200 cursor-pointer"
            @click="decrementItemNum"
            >-</span
          >
          <span class="inline-block py-2.5 px-5 border border-gray-200">{{
            number
          }}</span>
          <span
            class="inline-block -mx-1 p-2.5 bg-gray-200 hover:bg-gray-300 border border-gray-200 cursor-pointer"
            @click="incrementItemNum"
            >+</span
          >
          <button
            class="py-2 px-10 ml-2.5 bg-yellow-500 rounded-md text-white"
            @click="addItemToCart"
          >
            カートに追加する
          </button>
        </div>
        <p class="text-md pb-3">【アイテム説明】</p>
        <p class="text-xs mb-6">{{ item.itemText }}</p>
        <div class="text-center mb-6">
          <p class="text-md">
            ご注文金額合計：<span class="text-xl pb-1 border-b-2"
              >{{
                (item.itemPrice * number).toLocaleString("ja-JP")
              }}円(税抜)</span
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { itemType } from "../../types/itemInfoTypes";
import { CartStore } from "../../store";

type DataType = {
  url: string | undefined;
  item: itemType;
  number: number;
};

export default Vue.extend({
  data(): DataType {
    return {
      url: "",
      item: {},
      number: 1
    };
  },
  created() {
    if (this.$route.params.item) {
      this.item = this.$route.params.item as itemType;
      this.url = this.item.img1;
      sessionStorage.setItem("catch-params", JSON.stringify(this.item));
    } else {
      let storageItem = JSON.parse(
        sessionStorage.getItem("catch-params") as string
      );
      if (storageItem != null) {
        this.item = storageItem;
        this.url = this.item.img1;
      }
    }
  },
  methods: {
    addItemToCart(): void {
      this.item.itemNum = this.number;
      CartStore.addItemToCart(this.item);
    },
    incrementItemNum(): void {
      this.number++;
    },
    decrementItemNum(): void {
      if (this.number === 1) {
        this.number = 1;
      } else {
        this.number--;
      }
    },
    changeImage1(): void {
      this.url = this.item.img1;
    },
    changeImage2(): void {
      this.url = this.item.img2;
    },
    changeImage3(): void {
      this.url = this.item.img3;
    }
  }
});
</script>
