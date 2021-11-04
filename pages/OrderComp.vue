<template>
  <div class="py-2">
    <div v-if="fetchUserInfo">
      <p>{{ fetchUserInfo.name }}様</p>
      <p>注文ありがとうございます</p>
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
