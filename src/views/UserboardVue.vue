<template>
  <nav class="custom-nav" :class="{ scrolled: scrolled }">
    <div class="nav-container">
      <ul class="nav-left">
        <li>
          <router-link class="navbar-brand" to="/shop"
            ><span>關於FOX TEA</span></router-link
          >
        </li>
        <li>
          <router-link class="navbar-brand" to="/products"
            ><span>新鮮好茶</span></router-link
          >
        </li>
        <li>
          <router-link class="navbar-brand" to="/shop"
            ><span>常見問題</span></router-link
          >
        </li>
      </ul>

      <div class="nav-center">
        <router-link class="navbar-brand" to="/shop"
          ><h2>FOX TEA</h2></router-link
        >
      </div>

      <ul class="nav-right">
        <li>
          <router-link class="navbar-brand" to="/shop"
            ><span>登入</span></router-link
          >
        </li>
        <li class="cart-li">
          <router-link to="/shop" class="cart-link">
            <i class="bi bi-cart3 fs-3 text-white">
              <span class="cart-badge" v-if="cartCount > 0">{{
                cartCount
              }}</span>
            </i>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>

  <div class="main-content">
    <div class="divider"></div>
    <!-- <ToastMessages></ToastMessages> -->
    <router-view />
  </div>
</template>

<script>
import emitter from '@/methods/emitter'

export default {
  data() {
    return {
      scrolled: false,
      cartCount: 0,
    }
  },
  created() {},
  mounted() {
    window.addEventListener('scroll', this.handleScroll)

    // 初始化購物車數量（可以從 localStorage 或 API 拉資料）
    this.getCartCount() // ✅ 新增：初始從 localStorage 讀購物車數量

    // 監聽 mitt 事件
    emitter.on('cartUpdated', this.updateCart) // ✅ 新增：mitt 監聽事件
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)

    // 移除 mitt 監聽
    emitter.off('cartUpdated', this.updateCart) // ✅ 新增：移除 mitt 監聽
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 0 // 有往下捲就變 true
    },
    getCartCount() {
      // ✅ 新增：初始化購物車數量
      const cart = JSON.parse(localStorage.getItem('cartItemIds')) || []
      this.cartCount = cart.length
      // console.log('cartCount', this.cartCount)
    },
    updateCart(productId) {
      debugger
      const cart = JSON.parse(localStorage.getItem('cartItemIds')) || []

      // 若尚未加入，才新增
      if (!cart.includes(productId)) {
        cart.push(productId)
        localStorage.setItem('cartItemIds', JSON.stringify(cart))
      }

      // 更新紅點數量
      this.cartCount = cart.length
    },
  },
}
</script>
