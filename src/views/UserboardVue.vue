<template>
  <!-- -->
  <nav class="custom-nav" :class="{ scrolled: scrolled }">
    <ul class="nav-list">
      <li>
        <router-link class="navbar-brand" to="/user/cart"
          ><h1>FOX TEA</h1></router-link
        >
      </li>
      <li>
        <router-link class="navbar-brand" to="/user/cart"
          ><span>HOME</span></router-link
        >
      </li>
      <li>
        <router-link class="navbar-brand" to="/user/cart"
          ><span>FAQ</span></router-link
        >
      </li>
      <li>
        <router-link class="navbar-brand" to="/user/cart"
          ><span>COUPON!</span></router-link
        >
      </li>
    </ul>
  </nav>

  <div class="divider"></div>

  <div>
    <ToastMessages></ToastMessages>
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

<style scoped lang="scss">
.custom-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999; // 確保它在最上層
  background-image: url('../assets/images/banner-image.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-blend-mode: darken;
}

.nav-list {
  display: flex;
  list-style: none; /* 移除預設圓點 */
  gap: 20px; /* 項目間距 */
  margin: 0;
  padding: 20px;
}

.custom-nav h1,
.custom-nav span {
  color: white;
}

.divider {
  height: 0.5px;
  background-color: white;
  width: 100%;
}

.custom-nav.scrolled {
  background-color: #87a9bc;
  background-image: none;
}
</style>
