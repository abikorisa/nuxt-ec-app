import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import {
  required, max, min, email, alpha_dash, confirmed, oneOf
} from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: '{_field_}は必須項目です'
});

extend('max', {
  ...max,
  params: ['length'],
  message: '{length}文字以下で入力してください'
});

extend('min', {
  ...min,
  params: ['length'],
  message: '{length}文字以上で入力してください'
});

extend('email', {
  ...email,
  message: '入力形式が正しくありません'
});

extend('alpha_dash', {
  ...alpha_dash,
  message: '英数字のみで入力してください'
})

extend('confirmed', {
  ...confirmed,
  message: 'パスワードが一致していません'
})

extend('oneOf', {
  ...oneOf,
  message: 'どちらかを選択してください'
})

extend('zipcode', {
  validate(value: string) {
    return value.length === 7
  },
  message: '7桁の数字で入力してください(例: 1230001)'
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
