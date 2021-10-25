<template>
  <div class="w-screen bg-gray-100 bg-opacity-75">
    <Header class="w-screen text-gray-800" />
    <Nuxt
      class="
        min-h-screen
        text-gray-800
      "
    />
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ItemsStore } from "../store";

export default Vue.extend({
  async fetch(): Promise<void> {
    if (ItemsStore.items.length === 0) {
      await ItemsStore.fetchItemList();
    }
    console.log(ItemsStore.items);
  }
});
</script>

<style lang="scss">
.wrapper {
  width: 80%;
  max-width: 1170px;
  margin: 0 auto;
}
</style>
