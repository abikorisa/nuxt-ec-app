<template>
  <div
    class="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800"
  >
    <div
      class="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
    >
      <div class="p-4 flex flex-row items-center justify-between">
        <router-link
          to="/"
          class="text-lg flex font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
          >RAKU RAKU</router-link
        >
      </div>
      <nav
        :class="{ flex: open }"
        class="flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row"
      >
        <p
          v-if="getLoginUser"
          class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4"
        >
          {{ getLoginUser.name }}さん
        </p>
        <p
          v-else
          class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4"
        >
          ゲストさん
        </p>
        <router-link
          to="/cart"
          class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
        >
          カート
        </router-link>
        <router-link
          to="/orderhistory"
          class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
        >
          履歴
        </router-link>
        <router-link
          v-if="!getLoginUser"
          to="/login"
          class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
        >
          ログイン
        </router-link>
        <span
          v-else
          class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
          @click="userLogout"
          >ログアウト</span
        >
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { UserStore } from "../store/index";
import { CartStore } from "../store/index";
import { userInfoType } from "../types/userInfoTypes";

export default Vue.extend({
  data() {
    return {
      open: true
    };
  },
  methods: {
    userLogout(): void {
      UserStore.logout();
      CartStore.clearOrderInfoAct();
      this.$router.push("/");
    }
  },
  computed: {
    getUserUid(): string | null | undefined {
      return UserStore.uid;
    },
    getLoginUser(): userInfoType | null {
      return UserStore.userInfo;
    }
  }
});
</script>
