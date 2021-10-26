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
        <ValidationObserver v-slot="{ invalid }">
          <div class="text-center p-3">
            <label class="text-sm mb-1 align-top inline-block w-40"
              >お名前
              <span class="text-yellow-500">(必須)</span>
            </label>
            <ValidationProvider
              v-slot="{ errors }"
              name="お名前"
              rules="required"
            >
              <div>
                <input
                  class="h-10 rounded-md w-48 bg-gray-100 w-64 h-10 p-1.5"
                  v-model="userInfo.name"
                  type="text"
                />
                <p class="text-xs text-red-700">
                  {{ errors[0] }}
                </p>
              </div>
            </ValidationProvider>
          </div>
          <div class="text-center p-3">
            <label class="text-sm mb-1 align-top inline-block w-40"
              >郵便番号 <span class="text-yellow-500">(必須)</span></label
            >
            <ValidationProvider
              v-slot="{ errors }"
              name="郵便番号"
              rules="required|zipcode"
            >
              <div>
                <input
                  class="h-10 rounded-md w-48 bg-gray-100 w-64 h-10 p-1.5"
                  v-model="userInfo.zipcode"
                  type="text"
                />
                <p class="text-xs text-red-700">
                  {{ errors[0] }}
                </p>
              </div>
            </ValidationProvider>
          </div>
          <div class="text-center p-3">
            <label class="text-sm mb-1 align-top inline-block w-40"
              >住所 <span class="text-yellow-500">(必須)</span></label
            >
            <ValidationProvider
              v-slot="{ errors }"
              name="住所"
              rules="required"
            >
              <div>
                <input
                  class="h-10 rounded-md w-48 bg-gray-100 w-64 h-10 p-1.5"
                  v-model="userInfo.address"
                  type="text"
                />
                <p class="text-xs text-red-700">
                  {{ errors[0] }}
                </p>
              </div>
            </ValidationProvider>
          </div>
          <div class="text-center p-3">
            <label class="text-sm mb-1 align-top inline-block w-40"
              >電話番号 <span class="text-yellow-500">(必須)</span></label
            >
            <ValidationProvider
              v-slot="{ errors }"
              name="電話番号"
              rules="required|min:10|max:11"
            >
              <div>
                <input
                  class="h-10 rounded-md w-48 bg-gray-100 w-64 h-10 p-1.5"
                  v-model="userInfo.tel"
                  type="text"
                />
                <p class="text-xs text-red-700">
                  {{ errors[0] }}
                </p>
              </div>
            </ValidationProvider>
          </div>
          <div class="text-center p-3">
            <label class="text-sm mb-1 align-top inline-block w-40"
              >メールアドレス<span class="text-yellow-500">(必須)</span></label
            >
            <ValidationProvider
              v-slot="{ errors }"
              name="メールアドレス"
              rules="required|email"
            >
              <div>
                <input
                  class="h-10 rounded-md w-48 bg-gray-100 w-64 h-10 p-1.5"
                  v-model="userInfo.email"
                  type="text"
                />
                <p class="text-xs text-red-700">
                  {{ errors[0] }}
                </p>
              </div>
            </ValidationProvider>
          </div>
          <div class="text-center p-3">
            <label class="text-sm mb-1 align-top inline-block w-40"
              >パスワード<span class="text-yellow-500">(必須)</span></label
            >
            <ValidationProvider
              v-slot="{ errors }"
              name="パスワード"
              rules="required"
            >
              <div>
                <input
                  class="h-10 rounded-md w-48 bg-gray-100 w-64 h-10 p-1.5"
                  v-model="userInfo.password"
                  type="password"
                />
                <p class="text-xs text-red-700">
                  {{ errors[0] }}
                </p>
              </div>
            </ValidationProvider>
          </div>
          <div class="text-center p-3">
            <button
              class="bg-gray-300 py-2 px-10 bg-yellow-500 rounded-md text-white"
              @click="makeUserAccount"
            >
              会員登録を登録する
            </button>
          </div>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { auth } from "../plugins/firebase";
import { userInfoType } from "../types/userInfoTypes";
import { UserStore } from "../store/index";

type DataType = {
  userInfo: userInfoType;
};

export default Vue.extend({
  components: {
    ValidationProvider,
    ValidationObserver
  },
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
            this.userInfo.uid = userInfo.uid;
            UserStore.register(this.userInfo);
          })
          .then(() => {
            let userInfo = UserStore.userInfo;
            if (userInfo != null) {
              UserStore.addUserInfo(userInfo);
            }
          })
          .then(() => {
            this.$router.push("/");
          });
      }
    }
  }
});
</script>
