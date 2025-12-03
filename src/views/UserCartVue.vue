<template>
  <div class="cart">
    <div class="cart-title">
      <h1>已選擇商品</h1>
    </div>

    <div class="cart-body">
      <div class="cart-product">
        <div class="cart-item" v-for="item in carts" :key="item.id">
          <img :src="item.product.imageUrl" alt="商品圖片" />
          <h2>{{ item.product.title }}</h2>
          <CartAmount :product="item" @emit-amount="updateCart" />
          <h2>${{ item.product.price }}</h2>
          <button class="cart-delete-btn" @click="delCartItem(item.id)">
            <i class="bi bi-trash-fill"></i>
          </button>
        </div>
      </div>
      <div class="cart-sum">
        <div class="cart-sum-title">總計</div>
        <div class="cart-sum-price">${{ total }}</div>
      </div>
      <!-- <div class="cart-coupon">
        <input type="text" placeholder="請輸入優惠碼" /><button>
          套用優惠碼
        </button>
      </div> -->

      <div class="order-container">
        <!-- <div class="order-wrap">
          <div class="order-wrap-item step-on">1.輸入訂單資料</div>
          <div class="order-wrap-item">2.金流付款</div>
          <div class="order-wrap-item">3.付款完成</div>
        </div> -->

        <v-form @submit="createOrder" v-slot="{ errors }" class="order-form">
          <h3 class="form-title">訂購人資訊</h3>

          <div class="form-row">
            <div class="form-col-6">
              <div class="form-group">
                <label for="name" class="form-label">*訂購人姓名</label>
                <v-field
                  id="name"
                  name="name"
                  type="text"
                  class="form-control"
                  rules="required"
                  v-model="form.user.name"
                  placeholder="請輸入姓名"
                  :class="{ 'is-invalid': errors['name'] }"
                  :label="'訂購人姓名'"
                ></v-field>
                <error-message
                  name="name"
                  class="invalid-feedback"
                ></error-message>
              </div>
            </div>
            <div class="form-col-6">
              <div class="form-group">
                <label for="phone">*訂購人電話</label>
                <v-field
                  id="phone"
                  name="phone"
                  type="tel"
                  class="form-control"
                  rules="required"
                  v-model="form.user.tel"
                  placeholder="請輸入電話"
                  :class="{ 'is-invalid': errors['phone'] }"
                  :label="'訂購人電話'"
                ></v-field>
                <error-message
                  name="phone"
                  class="invalid-feedback"
                ></error-message>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="email">*Email</label>
            <v-field
              id="email"
              name="email"
              type="email"
              class="form-control"
              rules="required|email"
              v-model="form.user.email"
              placeholder="請輸入Email"
              :class="{ 'is-invalid': errors['email'] }"
              :label="'email'"
            ></v-field>
            <error-message
              name="email"
              class="invalid-feedback"
            ></error-message>
          </div>

          <div class="form-group">
            <label for="address">*地址</label>
            <v-field
              id="address"
              name="address"
              type="text"
              class="form-control"
              rules="required"
              v-model="form.user.address"
              placeholder="請輸入地址"
              :class="{ 'is-invalid': errors['address'] }"
              :label="'地址'"
            ></v-field>
            <error-message
              name="address"
              class="invalid-feedback"
            ></error-message>
          </div>

          <div class="form-group">
            <label for="message">留言</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              v-model="form.message"
            ></textarea>
          </div>

          <button type="submit" class="form-btn">送出訂單</button>
        </v-form>
      </div>

      <!-- <div class="cart-submit-btn" @click="goOrderPage()">送出訂單</div> -->
    </div>
  </div>
</template>

<script>
import CartAmount from '@/components/CartAmount.vue'
import cartHelper from '@/methods/cartHelper'

export default {
  components: {
    CartAmount,
  },
  data() {
    return {
      carts: [],
      total: 0,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
      },
      message: '',
    }
  },
  created() {
    this.getCart()
  },
  mounted() {
    document.body.classList.add('product-page')
  },
  beforeUnmount() {
    document.body.classList.remove('product-page')
  },
  methods: {
    getCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          console.log('UserCartVue [getCart] 查詢購物車api回傳結果', res.data)
          this.carts = res.data.data.carts
          this.total = res.data.data.total

          if (res.data.data.carts.length === 0) {
            cartHelper.clearCart()
            this.$router.push('/products')
          }
        }
      })
    },
    updateCart(product) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${product.id}`
      this.$http
        .put(api, { data: { product_id: product.id, qty: product.qty } })
        .then((res) => {
          if (res.data.success) {
            console.log(res.data)
            this.getCart()
          }
        })
    },
    delCartItem(id) {
      console.log('UserCartVue [delCartItem] input id', id)

      console.log(
        'UserCartVue [delCartItem] 呼叫刪除api前的暫存carts',
        this.carts,
      )

      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          console.log('UserCartVue [delCartItem] 刪除api結果', res.data)

          // 成功刪除商品後，同步商品ID到localStorage
          cartHelper.removeCartItem(id)

          // console.log('呼叫刪除api後的暫存carts', this.carts)

          this.getCart()

          console.log('UserCartVue [delCartItem] 刪除後呼叫getCart', this.carts)
        }
      })
    },
    goOrderPage() {
      console.log('goOrderPage')
      this.$router.push('/order')
    },
    createOrder(values) {
      console.log('當前 this.form 內容：', this.form)
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.$http.post(api, { data: order }).then((res) => {
        console.log('建立訂單結果:', res.data)
      })
      // this.$router.push('/checkout/123')
    },
  },
}
</script>
