<template>
  <div>
    <loading
      :active.sync="isLoading"
      loader="dots"
      :lock-scroll="true"
      color="orange"
    />
    <h2>產品管理列表</h2>
    <div class="product">
      <div class="row">
        <div
          v-for="item in productList"
          :key="item.id"
          class="col-lg-4 mb-3"
        >
          <div class="card">
            <img
              :src="item.imageUrl"
              class="card-img-top"
            >
            <div class="card-body pb-0">
              <div class="d-flex align-items-center">
                <h5 class="card-title">
                  {{ item.title }}
                </h5>
                <div class="h5 ml-auto badge badge-secondary">
                  {{ item.category }}
                </div>
              </div>
              <p class="card-text">
                {{ item.content }}
              </p>
              <div class="d-flex">
                <div class="h6 mr-auto">
                  原價 {{ item.origin_price | thousands-separator }} 元
                </div>
                <div class="h5 text-danger">
                  {{ item.price | thousands-separator }}
                </div>
              </div>
            </div>
            <div class="card-body d-flex bg-light">
              <button
                class="btn btn-sm btn-outline-secondary mr-auto"
                @click="getProductDetail(item.id)"
              >
                <i
                  v-if="loading.detailCart && item.id === currentId"
                  class="fa fa-spinner fa-pulse fa-fw"
                />
                產品詳細
              </button>
              <button
                class="btn btn-sm btn-outline-secondary"
                @click="addToCart(item.id)"
              >
                <i
                  v-if="loading.detailCart && item.id === currentId"
                  class="fa fa-spinner fa-pulse fa-fw"
                /> 加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pagination
      :page="pagination"
      @e-change-page="getCurrentPage"
    />
  </div>
</template>

<script>

// /* global $ */
export default {
  data () {
    return {
      isLoading: false,
      productListPaginationParam: {
        page: 1,
        paged: 5
      },
      pagination: {},
      loading: {
        fullScreen: false,
        detailCart: false
      },
      currentId: ''
    }
  },
  mounted () {

  },
  methods: {
    getProductList () {
      // GET api/{uuid}/ec/products
      const apiGetProductList = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`
      this.loading.fullScreen = true
      this.$http.get(apiGetProductList, { params: this.productListPaginationParam })
        .then(({ data }) => {
          // console.log(data.data, data.meta.pagination);
          this.pagination = data.meta.pagination
          this.productList = data.data
        }).catch(error => console.log(error))
        .finally(() => {
          this.loading.fullScreen = false
        })
    }
  }
}
</script>
