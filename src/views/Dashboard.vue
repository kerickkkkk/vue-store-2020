<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link
        to="/admin"
        class="navbar-brand"
      >
        後臺管理列表
      </router-link>
      <button
        class="navbar-toggler"
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
              to="/admin/products"
              class="nav-link"
            >
              產品列表 <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/admin/coupons"
              class="nav-link"
            >
              酷碰券
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/admin/storages"
              class="nav-link"
            >
              儲存庫
            </router-link>
          </li>
          <li class="nav-item ml-auto">
            <router-link
              to="/"
              class="nav-link"
            >
              返回前台
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>
