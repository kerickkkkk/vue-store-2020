
<template>
  <div>
    <!-- 後台 產品列表 -->
    <Loading
      :active.sync="fullScreenLoading"
    />
    <div class="text-right mb-3">
      <button
        class="btn btn-primary"
        data-toggle="modal"
        @click="openModal('new')"
      >
        建立新的產品
      </button>
    </div>
    <button
      class="btn btn-primary"
      @click="addOrder"
    >
      送出訂單
    </button>
    <table class="table table-hover">
      <thead>
        <tr>
          <th width="120">
            分類
          </th>
          <th>產品名稱</th>
          <th width="100">
            原價
          </th>
          <th width="100">
            售價
          </th>
          <th width="100">
            是否啟用
          </th>
          <th width="120">
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in productLists"
          :key="item.id"
        >
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.origin_price | thousands-separator }}</td>
          <td>{{ item.price | thousands-separator }}</td>
          <td :class="{'text-success': item.enabled}">
            {{ item.enabled ? '啟用' :'未啟用' }}
          </td>
          <td>
            <div
              class="btn btn-sm btn-outline-primary"
              data-toggle="modal"
              data-target="#productModal"
              @click="openModal('edit', item)"
            >
              編輯
            </div>
            <div
              class="btn btn-sm btn-outline-danger"
              data-toggle="modal"
              data-target="#delProductModal"
              @click="openModal('delete' , item)"
            >
              刪除
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :page="pagination"
      @e-change-page="getCurrentPage"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  name: 'AdimOrder',
  components: {
    Pagination
  },
  data () {
    return {
      token: '',
      fullScreenLoading: false,
      // 產品
      productLists: [],
      // 分頁參數
      pageParam: {
        page: 1,
        paged: 5
      },
      pagination: {}
    }
  },
  mounted () {
    this.getProducts()
  },
  created () {
    this.checkLoginStatus()
  },
  methods: {
    // 如果沒有 token 就返回首頁
    checkLoginStatus () {
      // 取得當前 token 對應 login page  token 名稱
      const checkToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.token = checkToken
    },
    getProducts () {
      const apiGetProducts = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/products`
      // GET api/{uuid}/admin/ec/products

      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`
      this.fullScreenLoading = true
      this.$http.get(apiGetProducts, { params: this.pageParam })
        .then(({ data }) => {
          this.productLists = data.data
          this.pagination = data.meta.pagination
        }).catch(error => {
          this.$bus.$emit('toast:push', error, 'error')
        })
        .finally(() => {
          this.fullScreenLoading = false
        })
    },
    getCurrentPage (val) {
      console.log('nowPage', val)
      this.pageParam.page = val
      this.getProducts()
    },
    addOrder () {
      const apiGetProducts = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/orders`
      // POST api/{uuid}/ec/orders

      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`
      this.fullScreenLoading = true
      this.$http.POST(apiGetProducts, { params: this.pageParam })
        .then(({ data }) => {
          this.productLists = data.data
          this.pagination = data.meta.pagination
        }).catch(error => {
          this.$bus.$emit('toast:push', error, 'error')
        })
        .finally(() => {
          this.fullScreenLoading = false
        })
    }
  }
}
</script>
