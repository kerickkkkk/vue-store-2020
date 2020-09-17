<template>
  <div class="sweetToast" />
</template>

<script>
export default {
  name: 'SweetToast',
  props: {
  },
  created () {
    this.$bus.$on('toast:push', (title = '123', icon = 'success') => {
      this.callToast(title, icon)
    })
  },
  methods: {
    callToast (title, icon) {
      const Toast = this.$swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', this.$swal.stopTimer)
          toast.addEventListener('mouseleave', this.$swal.resumeTimer)
        }
      })

      Toast.fire({
        icon,
        title
      })
    }
  }
}
</script>
