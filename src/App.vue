<template>
  <div>
    <!-- <loading
        :active.sync="isLoading"
      /> -->
    <SweetToast />
    <router-view />
  </div>
</template>
<script>
// /* global $ */
// /* global swal */
import SweetToast from '@/components/SweetToast'

export default {
  components: {
    SweetToast
  },
  data () {
    return {
      isLoading: false
    }
  },
  mounted () {
    // this.getData()

  },
  methods: {
    // getData () {
    //   // console.log(process.env.APIPATH, process.env.UUID)
    //   this.$http.get(`${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`)
    //     .then(data =>
    //       console.log(data)
    //     )
    // }
  }
}
</script>
<style lang="scss">
// 全部載入
// @import 'bootstrap'

//客製化載入
@import './assets/all.scss'

// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
