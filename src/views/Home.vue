<template>
  <div class="home">
    <button
      class="btn btn-outline-primary rounded-circle goTop"
      @click="goTop"
    >
      <i
        class="fa fa-arrow-up"
        aria-hidden="true"
      />
    </button>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button
        class="navbar-toggler ml-auto"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div
        id="navbarNav"
        class="collapse navbar-collapse"
      >
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link
              to="/"
              class="nav-link"
            >
              <i
                class="fa fa-envira"
                aria-hidden="true"
              />
              Home <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/products"
              class="nav-link"
            >
              產品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/cart"
              class="nav-link"
            >
              購物車列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/login"
              class="nav-link"
            >
              後台登入頁面
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div style="height:1000px" />
    <router-view />
  </div>
</template>

<script>
/* global $ */
export default {
  data () {
    return {

    }
  },
  methods: {
    goTop () {
      $('html,body').animate({ scrollTop: 0 }, 'slow')
    }
  }
}
</script>

<style lang="scss">
.btn-outline-primary:hover{
  color : #fff
}
.goTop{
  position: fixed;
  bottom: 10%;
  right: 10%;
}
</style>
