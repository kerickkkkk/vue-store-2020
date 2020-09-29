<template>
  <div>
    <loading
      :active.sync="isLoading"
    />
    <h2>這是樣板</h2>
    <input
      v-model="isLoading"
      type="checkbox"
    >
  </div>
</template>

<script>
// /* global $ */
export default {
  data () {
    return {
      isLoading: false
    }
  },
  mounted () {
    // toast

    this.$bus.$emit('toast:push', 123, 'success')
  },
  methods: {
  }
}
</script>
