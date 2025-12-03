<template>
  <div class="quantity-wrap">
    <div
      class="quantity-wrap-item"
      :class="[
        { flash: isFlashing && lastClicked === 'minus' },
        { disabled: item.qty === 1 },
      ]"
      @click="updateAmout('minus')"
    >
      <span>-</span>
    </div>
    <div class="quantity-wrap-item">
      <input class="quantity-input" type="number" v-model.number="item.qty" />
    </div>
    <div
      class="quantity-wrap-item"
      :class="{ flash: isFlashing && lastClicked === 'plus' }"
      @click="updateAmout('plus')"
    >
      <span>+</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
      // default: () => ({ name: '', price: 0, imageUrl: '' }),
    },
  },
  data() {
    return {
      item: {},
      isFlashing: false,
      lastClicked: '', // 'plus' 或 'minus'
    }
  },
  methods: {
    updateAmout(act) {
      console.log('updateAmout')
      this.triggerFlash(act)
      if (act === 'plus') {
        this.item.qty += 1
      } else if (act === 'minus') {
        this.item.qty -= 1
      } else {
        console.log('產品計算錯誤!')
      }
      console.log('emit-amout', this.item)
      this.$emit('emit-amount', this.item)
    },
    triggerFlash(direction) {
      this.lastClicked = direction
      this.isFlashing = true
      setTimeout(() => {
        this.isFlashing = false
      }, 200)
    },
  },
  created() {
    // 初始化數量
    if (this.product !== undefined) {
      this.item = this.product
      // console.log('item', this.item)
    }
  },
}
</script>
