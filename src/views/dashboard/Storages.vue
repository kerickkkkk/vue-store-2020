
<template>
  <div class="container mt-4">
    <!-- 後台 產品列表 -->
    <Loading
      :active.sync="fullScreenLoading"
    />
    <table class="table table-hover">
      <thead>
        <tr>
          <th>
            縮圖
          </th>
          <th>
            操作
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in storages"
          :key="item.id"
        >
          <td>
            <img
              :src="item.path"
              width="100"
              class="img-fluid"
            >
          </td>
          <td>
            <button
              class="btn btn-sm btn-outline-danger"
              data-toggle="modal"
              data-target="#delProductModal"
              @click="openModal(item)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :page="pagination"
      @e-change-page="getCurrentPage"
    />

    <!-- delProductModal -->
    <div
      id="delProductModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-danger">
            <h5
              id="exampleModalLabel"
              class="modal-title text-white"
            >
              刪除產品
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="cancelTempStorage"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除圖片 (刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-sm  btn-secondary"
              data-dismiss="modal"
              @click="cancelTempStorage"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-sm  btn-danger"
              @click="deleteStorage"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

/* global $ */
export default {
  name: 'Storages',
  components: {
    Pagination
  },
  data () {
    return {
      fullScreenLoading: false,
      // 產品
      storages: [],
      tempStorage: {},
      // 分頁參數
      pageParam: {
        page: 1,
        paged: 5
      },
      pagination: {}
    }
  },
  mounted () {
    this.getStorages()
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
    // 管理者產品列表
    getStorages () {
      const apiGetStorages = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage`
      // GET api/{uuid}/admin/storage

      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`
      this.fullScreenLoading = true
      this.$http.get(apiGetStorages, { params: this.pageParam })
        .then(({ data }) => {
          this.storages = data.data
          this.pagination = data.meta.pagination
        }).catch(error => {
          this.$bus.$emit('toast:push', error, 'error')
        })
        .finally(() => {
          this.fullScreenLoading = false
        })
    },
    // 產品相關
    // modal 集中控制 增刪修
    openModal (item) {
      console.log(item)
      this.tempStorage = { ...item }
      $('#delProductModal').modal('show')
    },
    deleteStorage () {
      const apiDeleteStorage = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage/${this.tempStorage.id}`
      // DELETE api/{uuid}/admin/storage/{id}
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`
      this.fullScreenLoading = true
      this.$http.delete(apiDeleteStorage)
        .then(res => {
          this.$bus.$emit('toast:push', '刪除成功', 'error')
          this.getStorages()
        }).catch(error => {
          this.$bus.$emit('toast:push', error, 'error')
        })
        .finally(() => {
          this.fullScreenLoading = false
          this.cancelTempStorage()
          $('#delProductModal').modal('hide')
        })
    },
    cancelTempStorage () {
      this.tempStorage = {}
    },
    getCurrentPage (val) {
      console.log('nowPage', val)
      this.pageParam.page = val
      this.getStorages()
    }
  }
}
</script>
