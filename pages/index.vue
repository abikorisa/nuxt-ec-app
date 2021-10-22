<template>
  <div class="wrapper">
    <div class="flex flex-wrap justify-center">
      <ul v-for="item in items" :key="item.index">
        <router-link
          :to="{
            name: 'ItemDetail-id'
          }"
        >
          <li class="m-3">
            <table>
              <thead>
                <td><img class="w-72" src="../assets/1/00.jpeg" /></td>
              </thead>
              <tbody>
                <td class="text-sm text-center">{{ item.name }}</td>
              </tbody>
              <tbody>
                <td class="text-sm text-center">{{ item.price }}</td>
              </tbody>
            </table>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      items: [
        { name: "ワンピース", price: 1900 },
        { name: "帽子", price: 1900 },
        { name: "帽子", price: 1900 },
        { name: "帽子", price: 1900 },
        { name: "帽子", price: 1900 },
        { name: "帽子", price: 1900 }
      ]
    };
  }
});
</script>
