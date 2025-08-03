<template>
  <div class="cart">
    <div class="cart-title">
      <h1>購物車清單</h1>
    </div>

    <div class="cart-body">
      <div class="cart-product" ref="cartProduct">
        <div class="cart-item" v-for="item in carts" :key="item.id">
          <img :src="item.product.imageUrl" alt="商品圖片" />
          <h2>{{ item.product.title }}</h2>
          <ShoppingAmount />
          <h2>${{ item.product.price }}</h2>
          <button class="cart-delete-btn">
            <i class="bi bi-trash-fill"></i>
          </button>
        </div>
      </div>

      <div class="cart-summary">
        <div class="cart-price" ref="summary">
          總金額區塊（可替換為動態資料）
        </div>
      </div>
    </div>
  </div>

  <div class="footer-body"></div>

  <!-- Footer 範例 -->
  <footer class="footer">
    <p>僅用於個人學習使用，非商業用途。©2025 FoxTea KevinChen</p>
  </footer>
</template>

<script>
import ShoppingAmount from '@/components/ShoppingAmount.vue'

export default {
  components: {
    ShoppingAmount,
  },
  data() {
    return {
      carts: [],
    }
  },
  created() {
    const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
    this.$http.get(api).then((res) => {
      if (res.data.success) {
        this.carts = res.data.data.carts
      }
    })
  },
  mounted() {
    document.body.classList.add('product-page')

    const summary = this.$refs.summary
    if (summary) {
      // 設定 transition 只做一次
      summary.style.transition = 'top 0.2s ease-out'
    }

    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleScroll) // 若畫面有變大小也要更新
  },
  beforeUnmount() {
    document.body.classList.remove('product-page')
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const cartProduct = this.$refs.cartProduct
      const summary = this.$refs.summary
      if (!cartProduct || !summary) return

      const productTop = cartProduct.getBoundingClientRect().top
      const productBottom = cartProduct.getBoundingClientRect().bottom
      const summaryHeight = summary.offsetHeight

      const scrollY = window.scrollY
      const navbarHeight = 80
      const reservedDistance = 10
      const baseTop = navbarHeight + reservedDistance + 45

      const offsetY = Math.min(scrollY * 0.1, 80)
      const containerHeight = cartProduct.offsetHeight
      const maxTop = containerHeight - summaryHeight

      const targetTop = Math.min(baseTop + offsetY, maxTop)

      const currentPosition = summary.style.position
      const currentTop = parseFloat(summary.style.top) || 0

      // 在這裡印出 currentTop 與 targetTop，方便偵錯
      console.log('currentTop:', currentTop, 'targetTop:', targetTop)

      // 用一個小容差避免因浮點誤差頻繁切換
      const topDiff = Math.abs(currentTop - targetTop)

      if (productTop < 150 && productBottom > summaryHeight + 150) {
        // 狀態一：浮動
        if (currentPosition !== 'fixed' || topDiff > 1) {
          summary.style.position = 'fixed'
          summary.style.top = `${targetTop}px`
          summary.style.left = `${summary.parentElement.getBoundingClientRect().left}px`
          summary.style.width = `${summary.parentElement.offsetWidth}px`
          summary.style.zIndex = '1001'
        }
      } else if (productBottom <= summaryHeight + 150) {
        // 狀態二：貼底部
        if (currentPosition !== 'absolute' || currentTop !== maxTop) {
          summary.style.position = 'absolute'
          summary.style.top = `${maxTop}px`
          summary.style.left = '0'
          summary.style.width = '100%'
          summary.style.zIndex = 'auto'
        }
      } else {
        // 狀態三：初始狀態
        if (currentPosition !== 'absolute' || currentTop !== offsetY) {
          summary.style.position = 'absolute'
          summary.style.top = `${offsetY}px`
          summary.style.left = '0'
          summary.style.width = '100%'
          summary.style.zIndex = 'auto'
        }
      }
    },
  },
}
</script>
