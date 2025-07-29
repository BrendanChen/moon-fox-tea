<template>
  <div class="spinner" :class="size"></div>
</template>

<script>
export default {
  name: 'SpinnerVue',
  props: {
    size: {
      type: String,
      default: 'sm', // 預設尺寸 small
      validator: (value) => ['sm', 'md', 'lg'].includes(value), // 驗證函式，限制 size 的值只能是 'sm', 'md', 或 'lg' 三種之一
    },
  },
}
</script>

<style scoped>
.spinner {
  border: 2px solid #fff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

.spinner.sm {
  width: 1rem;
  height: 1rem;
}

.spinner.md {
  width: 2rem;
  height: 2rem;
  border-width: 3px;
}

.spinner.lg {
  width: 3rem;
  height: 3rem;
  border-width: 4px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
