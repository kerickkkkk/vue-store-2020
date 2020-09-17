
<template>
  <div>
    <!-- 後台 產品列表 -->
    <Loading
      :active.sync="fullScreenLoading"
    />
    <h2>產品管理列表</h2>
    <div class="text-right mb-3">
      <button
        class="btn btn-primary"
        data-toggle="modal"
        @click="openModal('new')"
      >
        建立新的產品
      </button>
    </div>
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

    <!-- productModal -->
    <div
      id="productModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              id="exampleModalLabel"
              class="modal-title"
            >
              {{ modalTitle }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="cancelTempProduct"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-4">
                <input
                  ref="file"
                  type="file"
                  @change="uploadFile"
                >

                <div class="form-group">
                  <label :for="`uploadImg0`" />
                  <input
                    :id="`uploadImg0`"
                    v-model="tempProduct.imageUrl[0]"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                  >
                </div>
                <img
                  :src="tempProduct.imageUrl[0]"
                  class="img-fluid"
                  alt="圖片顯示位置"
                >
              </div>
              <div class="col-lg-8">
                <div class="form-group">
                  <label
                    for="title"
                    class="mb-2"
                  >標題</label>
                  <input
                    id="title"
                    v-model="tempProduct.title"
                    type="text"
                    class="form-control"
                    placeholder="請輸入標題"
                  >
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label
                      for="category"
                      class="mb-2"
                    >分類</label>
                    <input
                      id="category"
                      v-model="tempProduct.category"
                      type="text"
                      class="form-control"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label
                      for="unit"
                      class="mb-2"
                    >單位</label>
                    <input
                      id="unit"
                      v-model="tempProduct.unit"
                      type="text"
                      class="form-control"
                    >
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label
                      for="origin_price"
                      class="mb-2"
                    >原價</label>
                    <input
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價"
                      type="number"
                      class="form-control"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label
                      for="price"
                      class="mb-2"
                    >售價</label>
                    <input
                      id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價"
                      type="number"
                      class="form-control"
                    >
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <label
                    for="description"
                    class="mb-2"
                  >產品描述</label>
                  <textarea
                    id="description"
                    v-model="tempProduct.description"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產品描述"
                  />
                </div>
                <div class="form-group">
                  <label
                    for="content"
                    class="mb-2"
                  >說明內容</label>
                  <textarea
                    id="content"
                    v-model="tempProduct.content"
                    type="text"
                    class="form-control"
                    placeholder="請輸入說明內容"
                  />
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      id="enabled"
                      v-model="tempProduct.enabled"
                      class="form-check-input"
                      type="checkbox"
                    >
                    <label
                      class="form-check-label mb-2"
                      for="enabled"
                    >
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-sm  btn-secondary"
              data-dismiss="modal"
              @click="cancelTempProduct"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-sm  btn-primary"
              @click="saveProduct"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>

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
              @click="cancelTempProduct"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <span class="text-danger">{{ tempProduct.title }}</span> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-sm  btn-secondary"
              data-dismiss="modal"
              @click="cancelTempProduct"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-sm  btn-danger"
              @click="deleteProduct"
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
  name: 'AdimProducts',
  components: {
    Pagination
  },
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      token: '',
      fullScreenLoading: false,
      // 產品
      productLists: [],
      tempProduct: {
        imageUrl: []
      },
      isNew: false,
      // 分頁參數
      pageParam: {
        page: 1,
        paged: 5
      },
      pagination: {}
    }
  },
  computed: {
    modalTitle () {
      return this.isNew ? '新增產品' : '編輯產品'
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

      // 檢查 checkToken 是否為空 空則導回首頁
      // if (checkToken === '') {
      //   alert('no right return to home page')
      //   window.location = './login.html'
      // }

      // 檢查 api 是否還是有效

      // const apiCheck = `${process.env.VUE_APP_APIPATH}auth/check`
      // // 設定 Bearer token
      // this.$http.defaults.headers.common.Authorization = `Bearer ${checkToken}`
      // this.$http.post(apiCheck, { api_token: checkToken })
      //   .then(res => {
      //     // console.log("res", res.data.success)
      //     // api 失效就導向首頁
      //     if (!res.data.success) {
      //       console.log('token 已失效')
      //       window.location = './login.html'
      //     }
      //   })
      //   .catch(err => console.log(err))
      // 確認通過檢查 token 寫入
      this.token = checkToken
    },
    // 管理者產品列表
    getProducts () {
      const apiGetProducts = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/products`
      // GET api/{uuid}/admin/ec/products

      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`
      // 帶參數兩種方式:
      // 使用 params
      // ?XX=OO
      this.fullScreenLoading = true
      this.$http.get(apiGetProducts, { params: this.pageParam })
        .then(({ data }) => {
          // console.log('data', data.data, 'meta', data.meta.pagination)
          this.productLists = data.data
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
    openModal (isNew, item) {
      switch (isNew) {
        case 'new':
          this.cancelTempProduct()
          this.isNew = true
          $('#productModal').modal('show')
          break
        case 'edit':
          this.tempProduct = { ...item }
          this.isNew = false
          $('#productModal').modal('show')
          break
        case 'delete':
          this.tempProduct = { ...item }
          $('#delProductModal').modal('show')
          break
        default:
          this.$bus.$emit('toast:push', '沒東西', 'error')

          break
      }
    },
    saveProduct () {
      let httpMethod = 'post'
      // 一小時內打 200次請求會出現 429 錯誤
      // const corsUrl = "https://cors-anywhere.herokuapp.com/";
      let apiUrl = ''
      // POST api/{uuid}/admin/ec/product
      apiUrl = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product`

      // if (this.isNew === true) {
      //     // let timeStamp = new Date().getTime();
      //     // this.tempProduct.id = timeStamp;
      //     // this.productLists.push(this.tempProduct);
      // } else {
      //     // const index = this.productLists.findIndex(ele => ele.id === this.tempProduct.id);
      //     // this.productLists[index] = this.tempProduct;
      // }
      if (!this.isNew) {
        httpMethod = 'patch'
        apiUrl = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`
      }
      // console.log('add', apiUrl)
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`
      // console.log('watchPrar', this.tempProduct)
      this.fullScreenLoading = true

      this.$http[httpMethod](`${apiUrl}`, this.tempProduct)
        .then(res => {
          this.$bus.$emit('toast:push', '儲存成功', 'success')
          // this.productLists = data.data;
          this.getProducts()
        }).catch(error => {
          this.$bus.$emit('toast:push', error, 'error')
        })
        .finally(() => {
          this.fullScreenLoading = false
          this.cancelTempProduct()
          $('#productModal').modal('hide')
        })
    },
    deleteProduct () {
      const apiDeleteProduct = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`
      // DELETE api/{uuid}/admin/ec/product/{id}
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`
      this.fullScreenLoading = true
      this.$http.delete(apiDeleteProduct)
        .then(res => {
          this.$bus.$emit('toast:push', '刪除成功', 'error')
          this.getProducts()
        }).catch(error => {
          this.$bus.$emit('toast:push', error, 'error')
        })
        .finally(() => {
          this.fullScreenLoading = false
          this.cancelTempProduct()
          $('#delProductModal').modal('hide')
        })
      // const index = this.productLists.findIndex(ele => ele.id === this.tempProduct.id);
      // this.productLists.splice(index, 1);
    },
    cancelTempProduct () {
      this.$refs.file.type = 'text'
      this.$refs.file.type = 'file'
      this.tempProduct = {
        imageUrl: []
      }
    },
    uploadFile () {
      const file = this.$refs.file.files[0]
      const formData = new FormData()
      formData.append('file', file)
      const apiStorage = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage`
      // POST api/{uuid}/admin/storage
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`
      this.fullScreenLoading = true
      this.$http.post(apiStorage, formData)
        .then(res => {
          if (res.status === 200) {
            console.log(res)
            this.tempProduct.imageUrl.push(res.data.data.path)
          }
          // 新增成功
        }).catch(() => {
          this.$bus.$emit('toast:push', '上傳失敗 請檢查是不是檔案大小超過 2MB', 'error')
        })
        .finally(() => {
          this.fullScreenLoading = false
        })
    },

    /// //////////////////////////////
    getCurrentPage (val) {
      console.log('nowPage', val)
      this.pageParam.page = val
      this.getProducts()
    }
  }
}
</script>
