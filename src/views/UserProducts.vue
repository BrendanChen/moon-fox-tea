<template>
  <div>
    <div class="products-banner">
      <img
        src="https://demo.templatesjungle.com/wingtea/images/hero-image.jpg"
        alt="商品列表banner"
      />
    </div>

    <div class="product">
      <div class="wrap">
        <div class="item" v-for="item in products" :key="item.id">
          <div class="img-box">
            <img :src="item.imageUrl" alt="商品圖片" />
            <button class="view-more-btn">查看更多</button>
          </div>
          <div class="content">
            <p class="title">{{ item.title }}</p>
            <p class="price">NT$ {{ $filters.currency(item.origin_price) }}</p>
            <button>加入購物車</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <PaginationVue :pages="pagination" @emit-pages="getProducts"></PaginationVue>
</template>

<script>
import PaginationVue from '@/components/PaginationVue.vue'

export default {
  data() {
    return {
      products: [],
      pagination: {},
    }
  },
  components: {
    PaginationVue,
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${page}`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          console.log(res.data)
          this.products = res.data.products
          this.pagination = res.data.pagination
        }
      })
    },
  },
  created() {
    this.getProducts()
  },
}
</script>
