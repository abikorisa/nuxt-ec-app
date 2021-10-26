<template>
  <div class="wrapper">
    <div class="flex flex-wrap justify-center">
      <ul v-for="item in itemsFromStore" :key="item.index">
        <router-link
          :to="{
            name: 'ItemDetail-id',
            params: {
              item: item,
              id: item.id
            }
          }"
        >
          <li class="m-3">
            <table>
              <thead>
                <tr>
                  <td><img class="w-60" :src="item.img1" /></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-sm text-center">{{ item.itemName }}</td>
                </tr>
                <tr>
                  <td class="text-sm text-center">
                    {{ item.itemPrice.toLocaleString("ja-JP") }}円
                  </td>
                </tr>
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
import { db } from "../plugins/firebase";
import { itemType } from "../types/itemInfoTypes";
import { ItemsStore } from "../store";
import { UserStore } from "../store/index";

export default Vue.extend({
  data() {
    return {};
  },
  created() {
    console.log(UserStore.userInfo);
  },
  computed: {
    itemsFromStore(): itemType[] {
      return ItemsStore.items;
    }
  }
});
</script>
