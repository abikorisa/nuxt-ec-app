<template
  ><div>
    <div class="bg-white m-3 mx-auto rounded-md w-96 md:w-3/5 sm:w-4/5">
      <div class="py-2.5 px-12">
        <div class="p-3">
          <h2 class="text-md font-semibold">未登録の方はこちら</h2>
          <p class="text-xs text-gray-400">
            会員登録をされていないお客様は、こちらから会員登録をお願い致します。
          </p>
        </div>
        <div class="text-center p-3">
          <label class="text-sm mb-1 align-top inline-block w-40"
            >お名前
            <span class="text-yellow-500">(必須)</span>
          </label>
          <input
            class="h-10 rounded-md w-48 bg-gray-100 w-64 h-10 p-1.5"
            v-model="userInfo.name"
            type="text"
          />
        </div>
        <div class="text-center p-3">
          <label class="text-sm mb-1 align-top inline-block w-40"
            >郵便番号 <span class="text-yellow-500">(必須)</span></label
          >
          <input
            class="h-10 rounded-md w-48 bg-gray-100 w-64 h-10 p-1.5"
            v-model="userInfo.zipcode"
            type="text"
          />
        </div>
        <div class="text-center p-3">
          <label class="text-sm mb-1 align-top inline-block w-40"
            >住所 <span class="text-yellow-500">(必須)</span></label
          >
          <input
            class="h-10 rounded-md w-48 bg-gray-100 w-64 h-10 p-1.5"
            v-model="userInfo.address"
            type="text"
          />
        </div>
        <div class="text-center p-3">
          <label class="text-sm mb-1 align-top inline-block w-40"
            >電話番号 <span class="text-yellow-500">(必須)</span></label
          >
          <input
            class="h-10 rounded-md w-48 bg-gray-100 w-64 h-10 p-1.5"
            v-model="userInfo.tel"
            type="text"
          />
        </div>
        <div class="text-center p-3">
          <label class="text-sm mb-1 align-top inline-block w-40"
            >メールアドレス</label
          >
          <input
            class="h-10 rounded-md w-48 bg-gray-100 w-64 h-10 p-1.5"
            v-model="userInfo.email"
            type="text"
          />
        </div>
        <div class="text-center p-3">
          <label class="text-sm mb-1 align-top inline-block w-40"
            >パスワード</label
          >
          <input
            class="h-10 rounded-md w-48 bg-gray-100 w-64 h-10 p-1.5"
            v-model="userInfo.password"
            type="password"
          />
        </div>
        <div class="text-center p-3">
          <button
            class="bg-gray-300 py-2 px-10 bg-yellow-500 rounded-md text-white"
            @click="makeUserAccount"
          >
            会員登録を登録する
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { auth } from "../plugins/firebase";
import { userInfoType } from "../types/userInfoTypes";
import { UserStore } from "../store/index";

type DataType = {
  userInfo: userInfoType;
};

export default Vue.extend({
  data(): DataType {
    return {
      userInfo: {
        name: "",
        email: "",
        password: "",
        tel: "",
        zipcode: "",
        address: "",
        uid: ""
      }
    };
  },
  methods: {
    async makeUserAccount(): Promise<void> {
      if (
        this.userInfo.email === undefined ||
        this.userInfo.password === undefined
      ) {
        return;
      } else {
        auth
          .createUserWithEmailAndPassword(
            this.userInfo.email,
            this.userInfo.password
          )
          .then((userCredential: any) => {
            let userInfo = userCredential.user;
            UserStore.login(userInfo);
          })
          .then(() => {
            console.log(UserStore.uid);
            console.log(UserStore.login_user);
          })
          .then(() => {
            this.$router.push("/");
          });
      }
    }
  }
});
</script>
