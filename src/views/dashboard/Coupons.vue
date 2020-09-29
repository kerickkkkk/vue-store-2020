
<template>
  <div class="container">
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
        新增優惠券
      </button>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <!-- title  string  required  名稱
          code  string  required  序號
          percent integer required  折扣百分比
          enabled boolean required  是否開放
          deadline_at string  required  到期日 -->
          <th width="120">
            名稱
          </th>
          <th>
            序號
          </th>
          <th
            class="text-right"
            width="150"
          >
            折扣百分比
          </th>
          <th
            class="text-right"
            width="200"
          >
            到期日
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
          v-for="coupon in coupounLists"
          :key="coupon.id"
        >
          <td>{{ coupon.title }}</td>
          <td>{{ coupon.code }}</td>
          <td class="text-right">
            {{ coupon.percent }}
          </td>
          <td class="text-right">
            {{ couponzh_TW }}
          </td>
          <td :class="{'text-success': coupon.enabled}">
            {{ coupon.enabled ? '啟用' :'未啟用' }}
          </td>
          <td>
            <div
              class="btn btn-sm btn-outline-primary"
              data-toggle="modal"
              data-target="#couponsModal"
              @click="openModal('edit', coupon)"
            >
              編輯
            </div>
            <div
              class="btn btn-sm btn-outline-danger"
              data-toggle="modal"
              data-target="#delCouponsModal"
              @click="openModal('delete' , coupon)"
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

    <!-- couponsModal -->
    <div
      id="couponsModal"
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
              <!-- {{ modalTitle }} -->
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="cancelTempCoupon"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label
                for="title"
                class="mb-2"
              >*標題</label>
              <input
                id="title"
                v-model="tempCoupon.title"
                type="text"
                class="form-control"
                placeholder="請輸入標題"
              >
            </div>
            <div class="form-group">
              <label
                for="category"
                class="mb-2"
              >序號</label>
              <input
                id="category"
                v-model="tempCoupon.code"
                type="text"
                class="form-control"
              >
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label
                  for="percent"
                  class="mb-2"
                >折扣百分比</label>
                <input
                  id="percent"
                  v-model="tempCoupon.percent"
                  max="100"
                  min="1"
                  type="number"
                  class="form-control"
                >
              </div>
              <div class="form-group col-md-6">
                <label
                  for="unit"
                  class="mb-2"
                >到期日</label>
                <input
                  v-model="due_date"
                  type="date"
                  class="form-control"
                >
                <input
                  v-model="due_time"
                  type="time"
                  step="1"
                  class="form-control"
                >
              </div>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  id="enabled"
                  v-model="tempCoupon.enabled"
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
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-sm  btn-secondary"
              data-dismiss="modal"
              @click="cancelTempCoupon"
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

    <!-- delCouponsModal -->
    <div
      id="delCouponsModal"
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
              @click="cancelTempCoupon"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <span class="text-danger">{{ tempCoupon.title }}</span> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-sm  btn-secondary"
              data-dismiss="modal"
              @click="cancelTempCoupon"
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
  name: 'Coupons',
  components: {
    Pagination
  },
  data () {
    return {
      token: '',
      fullScreenLoading: false,
      coupounLists: [],
      tempCoupon: {},
      isNew: false,
      due_date: '',
      due_time: '',
      // 分頁參數
      pageParam: {
        page: 1
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
    this.getCoupouns()
  },
  created () {
    this.checkLoginStatus()
  },
  methods: {
    // 如果沒有 token 就返回首頁
    checkLoginStatus () {
      // 取得當前 token 對應 login page  token 名稱
      const checkToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
      // 確認通過檢查 token 寫入
      this.token = checkToken
    },
    // 管理者產品列表
    getCoupouns () {
      const apiGetCoupons = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupons`
      // GET api/{uuid}/admin/ec/coupons

      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`
      // 帶參數兩種方式:
      // 使用 params
      // ?XX=OO
      this.fullScreenLoading = true
      this.$http.get(apiGetCoupons, { params: this.pageParam })
        .then(({ data }) => {
          this.coupounLists = data.data
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
          this.cancelTempCoupon()
          this.isNew = true
          $('#couponsModal').modal('show')
          break
        case 'edit': {
          this.tempCoupon = { ...item }
          const timeSeparate = this.tempCoupon ? this.tempCoupon.deadline.datetime.split(' ') : {}
          ;[this.due_date, this.due_time] = timeSeparate
          this.isNew = false
          $('#couponsModal').modal('show')
          break
        }
        case 'delete':
          this.tempCoupon = { ...item }
          $('#delCouponsModal').modal('show')
          break
        default:
          this.$bus.$emit('toast:push', '沒這選項', 'error')
          break
      }
    },
    saveProduct () {
      let httpMethod = 'post'

      let apiUrl = ''
      // POST api/{uuid}/admin/ec/coupon
      apiUrl = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon`
      if (!this.isNew) {
        httpMethod = 'patch'
        apiUrl = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`
      }
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`

      this.tempCoupon.deadline_at = `${this.due_date} ${this.due_time}`
      this.fullScreenLoading = true
      this.$http[httpMethod](`${apiUrl}`, this.tempCoupon)
        .then(res => {
          this.$bus.$emit('toast:push', '儲存成功', 'success')
          this.getCoupouns()
        }).catch(() => {
          this.$bus.$emit('toast:push', '錯誤，新增失敗', 'error')
        })
        .finally(() => {
          this.fullScreenLoading = false
          this.cancelTempCoupon()
          $('#couponsModal').modal('hide')
        })
    },
    deleteProduct () {
      const apiDeleteCoupon = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`
      // DELETE api/{uuid}/admin/ec/coupon/{id}
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`
      this.fullScreenLoading = true
      this.$http.delete(apiDeleteCoupon)
        .then(res => {
          this.$bus.$emit('toast:push', '刪除成功', 'error')
          this.getCoupouns()
        }).catch(error => {
          this.$bus.$emit('toast:push', error, 'error')
        })
        .finally(() => {
          this.fullScreenLoading = false
          this.cancelTempCoupon()
          $('#delCouponsModal').modal('hide')
        })
      // const index = this.productLists.findIndex(ele => ele.id === this.tempCoupon.id);
      // this.productLists.splice(index, 1);
    },
    cancelTempCoupon () {
      this.tempCoupon = {}
      this.due_date = ''
      this.due_time = ''
    },

    /// //////////////////////////////
    getCurrentPage (val) {
      this.pageParam.page = val
      this.getCoupouns()
    }
  }
}
</script>
