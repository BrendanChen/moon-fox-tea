<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">月狐茶</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <router-link to="/dashboard/products" class="nav-link"
            >產品</router-link
          >
          <li class="nav-item">
            <a class="nav-link" href="#">訂單</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">優惠券</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_API}logout`
      this.$http.post(api, this.user).then((res) => {
        if (res.data.success) {
          this.$router.push('/login')
        }
      })
    },
  },
}
</script>
