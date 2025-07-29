<template>
  <div class="single-product">
    <div class="item">
      <img :src="product.imageUrl" alt="商品圖片" />
    </div>
    <div class="item">
      <h1>{{ product.title }}</h1>
      <span>重量: {{ product.unit }}</span>
      <h1 class="product-origin_price">${{ product.origin_price }}</h1>
      <p>
        {{ product.description }}
      </p>
      <ShoppingAmount></ShoppingAmount>
      <button
        class="addBtn"
        @click="addCart(product.id)"
        :disabled="this.status.loadingItem === product.id"
      >
        <SpinnerVue v-if="status.loadingItem === product.id" :size="'sm'" />
        加入購物車
      </button>
    </div>
  </div>
</template>

<script>
import ShoppingAmount from '@/components/ShoppingAmount.vue'
import SpinnerVue from '@/components/SpinnerVue.vue'
import cartHelper from '@/methods/cartHelper'

export default {
  data() {
    return {
      product: {},
      status: {
        cartItemIds: cartHelper.getCartItemIds(),
        loadingItem: '', // 對應品項id
      },
    }
  },
  components: {
    ShoppingAmount,
    SpinnerVue,
  },
  methods: {
    addCart(id) {
      // ✅ 若此商品已經加入過購物車，就跳出提示
      if (cartHelper.isInCart(id)) {
        alert('此商品已加入購物車')
        return
      }

      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id
      console.log('loadingItem', this.status.loadingItem)
      const cart = {
        product_id: id,
        qty: 1,
      }
      this.$http.post(url, { data: cart }).then((res) => {
        this.status.loadingItem = ''

        if (res.data.success) {
          console.log('loadingItem', this.status.loadingItem)
          cartHelper.addCartItem(id)
        } else {
          alert('加入購物車失敗')
        }
      })
    },
  },
  created() {
    console.log('商品 ID:', this.$route.params.id)
    const productId = this.$route.params.id
    const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${productId}`
    this.$http.get(api).then((res) => {
      if (res.data.success) {
        console.log(res.data)
        this.product = res.data.product
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
