<template>
  <div class="py-2">
    <div class="text-center"><h2>商品詳細</h2></div>
    <div class="bg-white m-3 mx-auto rounded-md flex w-96 md:w-3/5 sm:w-4/5">
      <img class="w-80" :src="item.item.img1" />
      <div>ワンピース</div>
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
      this.item = this.$route.params;
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
  }
});
</script>
