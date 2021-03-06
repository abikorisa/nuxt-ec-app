<template>
  <div>
    <div class="bg-white m-3 mx-auto rounded-md w-11/12 sm:w-96 md:w-3/5">
      <div class="py-2.5 px-12">
        <div class="p-3">
          <h2 class="text-md font-semibold">お届け先を入力してください</h2>
          <p class="text-xs text-gray-400">
            下記の情報を入力して注文を確定してください。
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
                  class="rounded-md bg-gray-100 w-64 h-10 p-1.5"
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
                  class="rounded-md bg-gray-100 w-64 h-10 p-1.5"
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
                  class="rounded-md bg-gray-100 w-64 h-10 p-1.5"
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
                  class="rounded-md bg-gray-100 w-64 h-10 p-1.5"
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
                  class="rounded-md bg-gray-100 w-64 h-10 p-1.5"
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
            <div class="flex justify-center">
              <ValidationProvider
                v-slot="{ errors }"
                name="配達日"
                rules="required"
              >
                <input
                  v-model="deliveryDate"
                  class="rounded-md bg-gray-100 w-34 h-10 p-1.5"
                  name="配達日"
                  type="date"
                />
                <p class="text-xs text-red-700">
                  {{ errors[0] }}
                </p>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="配送時間"
                rules="required"
              >
                <div>
                  <select class="rounded-md bg-gray-100 w-28 h-10" type="text"
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
          </div>

          <div class="text-center p-3">
            <button
              class="py-2 px-10 bg-yellow-500 rounded-md text-white"
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
  totalPrice: number;
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
      totalPrice: 0,
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
    priceSum() {
      let totalPrice = 0;
      let cartItems = CartStore.cartItems.itemInfo;
      cartItems.forEach((item: any) => {
        totalPrice += item.itemNum * item.itemPrice;
      });
      this.totalPrice = totalPrice + totalPrice * 0.1;
    },
    orderSubmit() {
      this.setNowTime();
      this.priceSum();
      let order = CartStore.cartItems;
      order.name = this.name;
      order.email = this.email;
      order.zipcode = this.zipcode;
      order.address = this.address;
      order.tel = this.tel;
      order.orderDate = this.orderDate;
      order.totalPrice = this.totalPrice;
      order.deliveryDate = this.deliveryDate;
      order.status = 1;
      //一度ログアウトしているのでorderIDがからで追加されない
      console.log(CartStore.orderId);
      CartStore.orderConfirm(order);
      this.$router.push("/OrderComp");
    }
  }
});
</script>
