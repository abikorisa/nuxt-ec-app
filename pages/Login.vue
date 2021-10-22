<template>
  <div class="py-2">
    <div class="text-center"><h2>ログイン・新規登録</h2></div>
    <div class="bg-white m-3 mx-auto rounded-md w-96 md:w-3/5 sm:w-4/5">
      <div class="py-2.5 px-12">
        <div class="p-3">
          <h2 class="text-md font-semibold">会員の方はこちら</h2>
          <p class="text-xs text-gray-400">
            商品のご購入、マイページのご利用にはログインが必要です。
          </p>
        </div>
        <div class=" text-center p-3">
          <label class="text-sm mb-1 align-top inline-block w-40"
            >メールアドレス</label
          >
          <input
            class="h-10 rounded-md w-48 bg-gray-100 w-64 h-10 p-1.5"
            type="text"
          />
        </div>
        <div class=" text-center p-3">
          <label class="text-sm mb-1 align-top inline-block w-40"
            >パスワード</label
          >
          <input
            class="h-10 rounded-md w-48 bg-gray-100 w-64 h-10 p-1.5"
            type="password"
          />
        </div>
        <div class="text-center p-3">
          <button
            class="bg-gray-300 py-2 px-10 bg-yellow-500 rounded-md text-white"
          >
            会員ログイン
          </button>
        </div>
      </div>
    </div>
    <Register />
  </div>
</template>
