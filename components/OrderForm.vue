<template>
  <div>
    <div class="bg-white m-3 mx-auto rounded-md w-96 md:w-3/5 sm:w-4/5">
      <div class="py-2.5 px-12">
        <div class="p-3">
          <h2 class="text-md font-semibold">お届け先を入力してください</h2>
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
                  v-model="name"
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
                  v-model="zipcode"
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
                  v-model="address"
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
                  v-model="tel"
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
                  v-model="email"
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
              >配送日時<span class="text-yellow-500">(必須)</span></label
            >
            <ValidationProvider
              v-slot="{ errors }"
              name="メールアドレス"
              rules="required|email"
            >
              <div>
                <select
                  class="h-10 rounded-md w-48 bg-gray-100 w-64 h-10 p-1.5"
                  v-model="email"
                  type="text"
                  ><option
                    v-for="(option, index) in options"
                    :value="option.value"
                    :key="index"
                  >
                    {{ option.label }}
                  </option></select
                >
                <p class="text-xs text-red-700">
                  {{ errors[0] }}
                </p>
              </div>
            </ValidationProvider>
          </div>

          <div class="text-center p-3">
            <button
              class="bg-gray-300 py-2 px-10 bg-yellow-500 rounded-md text-white"
              :disabled="invalid"
              @click="orderSubmit"
            >
              ご注文を確定する
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
import { CartStore, UserStore } from "../store/index";

type DataType = {
  name?: string;
  email?: string;
  zipcode?: string;
  address?: string;
  tel?: string;
  orderDate: string;
  deliveryDate: string;
  deliveryTime: string;
  payment: number;
  creditCardNum: string;
  selectPayment: boolean;
  options: Array<{ [field: string]: any }>;
};

export default Vue.extend({
  components: {
    ValidationProvider,
    ValidationObserver
  },
  created() {
    if (UserStore.userInfo !== null) {
      this.name = UserStore.userInfo.name;
      this.email = UserStore.userInfo.email;
      this.zipcode = UserStore.userInfo.zipcode;
      this.address = UserStore.userInfo.address;
      this.tel = UserStore.userInfo.tel;
    }
  },
  data(): DataType {
    return {
      name: "",
      email: "",
      zipcode: "",
      address: "",
      tel: "",
      orderDate: "",
      deliveryDate: "",
      deliveryTime: "",
      payment: 0,
      creditCardNum: "",
      selectPayment: false,
      options: [
        { label: "10時", value: "10" },
        { label: "11時", value: "11" },
        { label: "12時", value: "12" },
        { label: "13時", value: "13" },
        { label: "14時", value: "14" },
        { label: "15時", value: "15" },
        { label: "16時", value: "16" },
        { label: "17時", value: "17" }
      ]
    };
  },
  methods: {
    setNowTime() {
      let now = new Date();
      let ye = now.getFullYear();
      let mo = ("0" + (now.getMonth() + 1)).slice(-2);
      let da = ("0" + now.getDate()).slice(-2);
      this.orderDate = ye + "年" + mo + "月" + da + "日";
    },
    orderSubmit() {
      this.setNowTime();
      let order = CartStore.cartItems;
      order.name = this.name;
      order.email = this.email;
      order.zipcode = this.zipcode;
      order.address = this.address;
      order.tel = this.tel;
      order.status = 1;
      CartStore.updateOrder(order);
    }
  }
});
</script>
