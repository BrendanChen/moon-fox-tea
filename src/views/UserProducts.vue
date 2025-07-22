<template>
  <div class="products-banner">
    <img src="https://picsum.photos/1200/300/?random=2" />
  </div>

  <div class="product">
    <div class="wrap">
      <div class="item" v-for="item in products" :key="item.id">
        <img alt="" :src="item.imageUrl" />
        <p>{{ item.title }}</p>
        <p>{{ $filters.currency(item.origin_price) }}</p>
        <button>加入購物車</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      pagination: {},
    }
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
