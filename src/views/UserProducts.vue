<template>
  <div>
    <div class="products-banner">
      <img src="../assets/images/products-image.jpg" alt="商品列表banner" />
    </div>

    <div class="catergoryTitleArea">
      <h1 class="title">所有商品</h1>
      <p class="content">精選自然好茶，讓日常多一份從容與美好。</p>
    </div>

    <div class="catergory">
      <div class="item spacer"></div>
      <div
        class="item"
        :class="{ active: currentCategory === 'all' }"
        @click="selectCategory('all')"
      >
        <i class="fa-solid fa-leaf"></i> 所有商品
      </div>
      <div
        class="item"
        :class="{ active: currentCategory === 'black' }"
        @click="selectCategory('black')"
      >
        <i class="bi bi-cup-hot"></i> 紅茶
      </div>
      <div
        class="item"
        :class="{ active: currentCategory === 'oolong' }"
        @click="selectCategory('oolong')"
      >
        <i class="bi bi-cup-hot"></i> 烏龍茶
      </div>
      <div
        class="item"
        :class="{ active: currentCategory === 'green' }"
        @click="selectCategory('green')"
      >
        <i class="bi bi-cup-hot"></i> 綠茶
      </div>
      <div class="item spacer"></div>
    </div>

    <div class="product">
      <div class="wrap">
        <div class="item" v-for="item in products" :key="item.id">
          <div class="img-box">
            <img :src="item.imageUrl" alt="商品圖片" />
            <button class="view-more-btn" @click="getProduct(item.id)">
              查看更多
            </button>
          </div>
          <div class="content">
            <p class="title">{{ item.title }}</p>
            <p class="price">NT$ {{ $filters.currency(item.origin_price) }}</p>
            <button
              @click="addCart(item.id)"
              :disabled="this.status.loadingItem === item.id"
            >
              <SpinnerVue v-if="status.loadingItem === item.id" :size="'sm'" />
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <PaginationVue
    v-if="currentCategory === 'all'"
    :pages="pagination"
    @emit-pages="getProducts"
  ></PaginationVue>
</template>

<script>
import PaginationVue from '@/components/PaginationVue.vue'
import SpinnerVue from '@/components/SpinnerVue.vue'
import cartHelper from '@/methods/cartHelper'

export default {
  data() {
    return {
      products: [],
      pagination: null, // 一開始設 null
      currentCategory: 'all', // 控制分類狀態
      cartItemIds: cartHelper.getCartItemIds(),
      status: {
        loadingItem: '', // 對應品項id
      },
    }
  },
  components: {
    PaginationVue,
    SpinnerVue,
  },
  methods: {
    selectCategory(category) {
      this.currentCategory = category
      if (category === 'all') {
        this.pagination = null // 初始化分頁
        this.getAll()
      } else {
        this.getProducts(category)
      }
    },
    getAll() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.products = res.data.products
        }
      })
    },
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${page}`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          console.log(res.data)
          this.products = res.data.products.filter(
            (product) => product.category === this.currentCategory,
          )
          this.pagination = res.data.pagination
        }
      })
    },
    getProduct(id) {
      this.$router.push(`/product/${id}`)
    },
    addCart(id) {
      // ✅ 若此商品已經加入過購物車，就跳出提示
      if (cartHelper.isInCart(id)) {
        alert('此商品已加入購物車')
        return
      }

      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: 1,
      }
      this.$http.post(url, { data: cart }).then((res) => {
        this.status.loadingItem = ''
        if (res.data.success) {
          cartHelper.addCartItem(id)
        } else {
          alert('加入購物車失敗')
        }
      })
    },
  },
  created() {
    this.selectCategory('all') // 預設載入全部商品
  },
}
</script>
