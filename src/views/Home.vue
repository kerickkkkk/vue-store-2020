<template>
  <div class="home">
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
    <!-- <div id="nav">
      <router-link to="/">
        Home
      </router-link> |
      <router-link to="/about">
        About
      </router-link> |
      <router-link to="/products">
        產品列表
      </router-link> |
      <router-link to="/cart">
        購物車列表
      </router-link> |
      <router-link to="/login">
        後台登入頁面
      </router-link>
    </div>
    <router-view /> -->
  </div>
</template>

<script>
export default {

}
</script>
