<template>
  商品數量
  <div class="quantity-wrap">
    <div
      class="quantity-wrap-item"
      :class="[
        { flash: isFlashing && lastClicked === 'minus' },
        { disabled: quantity === 1 },
      ]"
      @click="minus"
    >
      <span>-</span>
    </div>
    <div class="quantity-wrap-item">
      <input class="quantity-input" type="number" v-model.number="quantity" />
    </div>
    <div
      class="quantity-wrap-item"
      :class="{ flash: isFlashing && lastClicked === 'plus' }"
      @click="add"
    >
      <span>+</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: 1,
      isFlashing: false,
      lastClicked: '', // 'plus' 或 'minus'
    }
  },
  methods: {
    add() {
      this.quantity += 1
      this.triggerFlash('plus')
    },
    minus() {
      if (this.quantity === 1) return // 阻止繼續減
      this.quantity -= 1
      this.triggerFlash('minus')
    },
    triggerFlash(direction) {
      this.lastClicked = direction
      this.isFlashing = true
      setTimeout(() => {
        this.isFlashing = false
      }, 200)
    },
  },
}
</script>
