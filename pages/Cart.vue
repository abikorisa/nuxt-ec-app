<template>
  <div class="py-2">
    <div v-if="showCartPage" class="text-center">
      <h2>カートに入ってる商品</h2>
    </div>
    <div v-else class="text-center"><h2>注文内容</h2></div>
    <div class="bg-white m-3 mx-auto rounded-md w-96 md:w-3/5 sm:w-4/5">
      <div class="py-2.5 flex px-12 justify-center">
        <img class="w-32" src="../assets/1/01.jpeg" />
        <div class="w-96">
          <p>ワンピース</p>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <button
        class="py-2 mx-2 px-10 bg-yellow-500 rounded-md text-white"
        @click="backToHome"
      >
        ショッピングを続ける
      </button>
      <button class="py-2 mx-2 px-10 bg-yellow-500 rounded-md text-white">
        注文に進む
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

type DataType = {
  showCartPage: boolean;
};

export default Vue.extend({
  data() {
    return {
      showCartPage: true
    };
  },
  methods: {
    backToHome() {
      this.$router.push("/");
    }
  }
});
</script>
