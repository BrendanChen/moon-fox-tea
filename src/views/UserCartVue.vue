<template>
  <div class="cart">
    <div class="cart-title">
      <h1>購物車清單</h1>
    </div>

    <div class="wrap">
      <div class="cart-product">
        <div class="item" v-for="item in carts" :key="item.id">
          <img :src="item.product.imageUrl" alt="商品圖片" />
          <h2>{{ item.product.title }}</h2>
          <ShoppingAmount></ShoppingAmount>
          <h2>$2400</h2>
          <button class="delBtn">
            <i class="bi bi-trash-fill" style="font-size: 24px"></i>
          </button>
        </div>
      </div>

      <div class="cart-product product-sum-block">
        <div class="cart-price">123</div>
      </div>
    </div>
  </div>
</template>

<script>
import ShoppingAmount from '@/components/ShoppingAmount.vue'

export default {
  data() {
    return {
      carts: [],
    }
  },
  components: {
    ShoppingAmount,
  },
  created() {
    const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
    this.$http.get(api).then((res) => {
      if (res.data.success) {
        console.log(res.data)
        this.carts = res.data.data.carts
      }
    })
  },
  mounted() {
    document.body.classList.add('product-page')
  },
  beforeUnmount() {
    document.body.classList.remove('product-page')
  },
}
</script>
