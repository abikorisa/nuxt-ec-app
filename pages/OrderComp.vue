<template>
  <div class="py-2">
    <div
      v-if="fetchUserInfo"
      class="bg-white p-6 m-3 mx-auto rounded-md w-11/12 sm:w-96 md:w-3/5 text-center"
    >
      <p class="text-md mb-2.5">{{ fetchUserInfo.name }} 様</p>
      <p class="text-md mb-1.5">
        この度はご購入いただきありがとうございました。
      </p>
      <p class="text-md">
        ご購入いただいた商品は、<br />
        <router-link to="/orderhistory" class="underline">注文履歴</router-link
        >よりご確認いただけます。<br />
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { UserStore } from "../store";
import { userInfoType } from "../types/userInfoTypes";

export default Vue.extend({
  computed: {
    fetchUserInfo(): userInfoType | null {
      return UserStore.userInfo;
    }
  }
});
</script>
