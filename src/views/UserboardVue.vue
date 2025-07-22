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
        <li>
          <router-link class="navbar-brand" to="/shop"
            ><span>購物車</span></router-link
          >
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
export default {
  data() {
    return {
      scrolled: false,
    }
  },
  created() {},
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 0 // 有往下捲就變 true
    },
  },
}
</script>

<!-- <style scoped lang="scss">
.main-content {
  padding-top: 80px; // 避開 fixed nav
}

.custom-nav {
  height: 80px; // 固定高度防止蓋住白色分隔線
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background-image: url('../assets/images/banner-image.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-blend-mode: darken;
  display: flex;
  align-items: center;
}

.nav-container {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 40px;
  position: relative; // ⭐ 讓 center 可以絕對置中
}

.nav-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.nav-left {
  display: flex;
  list-style: none;
  gap: 30px;
  margin: 0;
  padding: 0;
}

.nav-right {
  display: flex;
  list-style: none;
  gap: 30px;
  margin: 0;
  padding: 0;
  margin-left: auto; // ⭐ 靠右
}

.nav-left li,
.nav-right li {
  display: flex;
  align-items: center;
}

.custom-nav h2,
.custom-nav span {
  color: white;
}

.divider {
  height: 1px;
  background-color: white;
  width: 100%;
}

.custom-nav.scrolled {
  background-color: #87a9bc;
  background-image: none;
}

// 幫 h2 移除預設外距,無論左邊幾個選單、右邊幾個項目都固定置中
.nav-center h2 {
  margin: 0;
}
</style> -->
