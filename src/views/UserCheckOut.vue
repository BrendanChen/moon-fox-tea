<style>
/* 整體背景與排版 */
.page-container {
  max-width: 900px;
  margin: 20px auto;
  padding: 10px;
  font-family: 'Noto Sans TC', Arial, sans-serif;
}

/* --- 步驟條 --- */
.order-wrap {
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  padding: 0 10px;
}

.order-wrap-item {
  padding: 10px 20px;
  border-radius: 20px;
  background: #e9e9e9;
  color: #666;
  font-size: 15px;
}

.order-wrap-item.step-on {
  background: #ead2ac;
  color: black;
  font-weight: bold;
}

/* --- 卡片區塊 --- */
.card {
  background: #fff;
  padding: 20px 24px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  margin-bottom: 30px;
}

/* --- 表格風格 --- */
.card table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
}

.card thead th {
  background: #f9f9f9;
  padding: 14px 16px;
  font-weight: 600;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.card td,
.card th {
  padding: 14px 16px;
  border-bottom: 1px solid #e5e5e5;
}

.card tbody tr:last-child td {
  border-bottom: none;
}

.card tfoot td {
  background: #fcfcfc;
  padding: 16px;
  font-weight: bold;
  border-top: 2px solid #ccc;
}

/* 右對齊 */
.text-end {
  text-align: right;
}

/* --- 按鈕 --- */
button {
  width: 100%;
  padding: 14px;
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: #ead2ac;
  color: black;
  transition: 0.2s;
}

button:hover {
  background: #1e5ecc;
}
</style>

<template>
  <div class="page-container">
    <!-- 步驟條 -->
    <div class="order-wrap">
      <div class="order-wrap-item">1. 輸入訂單資料</div>
      <div class="order-wrap-item">2. 金流付款</div>
      <div class="order-wrap-item step-on">3. 付款完成</div>
    </div>

    <!-- 商品明細 -->
    <div class="card">
      <table>
        <thead>
          <tr>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td>{{ item.product.title }}</td>
            <td>{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="text-end">{{ item.final_total }}</td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td colspan="2">總計</td>
            <td class="text-end">{{ order.total }} 元</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- BBB 訂購人資訊 -->
    <div class="card">
      <table>
        <tbody>
          <tr>
            <th width="120">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="order.is_paid === false">
        <button>確認付款去</button>
      </div>
    </div>
  </div>
</template>

<script type="module">
export default {
  data() {
    return {
      order: {
        user: {},
      },
      orderId: '',
      isLoading: false,
    }
  },
  methods: {
    getOrder() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`

      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.order = res.data.order
          console.log(res)
        }
      })
    },
    payOrder() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`

      this.$http.post(url).then((res) => {
        console.log(res)
        if (res.data.success) {
          this.getOrder()
        }
      })
    },
  },
  created() {
    this.orderId = this.$route.params.orderId
    console.log(this.orderId)
    this.getOrder()
  },
}
</script>
