<template>
  <div class="wrapper">
    <h2>履歴</h2>
    <p>{{ fetchOrderItems }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { CartStore } from "../store";

export default Vue.extend({
  computed: {
    fetchOrderItems() {
      return CartStore.orderList;
    }
  }
});
</script>
