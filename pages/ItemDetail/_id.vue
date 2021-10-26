<template>
  <div class="py-2">
    <div class="text-center"><h2>商品詳細</h2></div>
    <div
      class="bg-white m-3 mx-auto rounded-md flex justify-center w-96 md:w-3/5 sm:w-4/5"
    >
      <div class="p-3">
        <img class="w-80 pb-3" :src="url" />
        <div class="flex justify-between">
          <img class="w-24" :src="item.img1" @click="changeImage1" />
          <img class="w-24" :src="item.img2" @click="changeImage2" />
          <img class="w-24" :src="item.img3" @click="changeImage3" />
        </div>
      </div>
      <div class="p-3 w-80">
        <div class="border-dashed border-b border-light-blue-500 mb-3">
          <p class="text-2xl py-2">{{ item.itemName }}</p>
          <p class="text-right text-xl py-2">
            {{ item.itemPrice.toLocaleString("ja") }}円(税抜)
          </p>
        </div>
        <div class="h-10 w-32">
          <div
            class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1"
          >
            <button
              @click="decrementItemNum"
              class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
            >
              <span class="m-auto text-2xl font-thin">−</span>
            </button>
            <span
              class="outline-none focus:outline-none text-center w-full bg-gray-200 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
              >{{ number }}</span
            >
            <button
              @click="incrementItemNum"
              class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
            >
              <span class="m-auto text-2xl font-thin">+</span>
            </button>
          </div>
        </div>
        <p class="text-xs pb-3">【アイテム説明】</p>
        <p class="text-xs">{{ item.itemText }}</p>
        <p class="text-md">
          ご注文金額合計：<span
            >{{
              (item.itemPrice * number).toLocaleString("ja-JP")
            }}円(税抜)</span
          >
        </p>
        <button
          class="py-2 px-10 bg-yellow-500 rounded-md text-white"
          @click="addItemToCart"
        >
          カートに追加する
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { itemType } from "../../types/itemInfoTypes";

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
      console.log("パラムス復活");
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
      console.log(this.item);
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
