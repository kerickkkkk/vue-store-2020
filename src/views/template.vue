<template>
  <div>
    <loading
      :active.sync="isLoading"
    />
    <h2>這是樣板</h2>
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

  },
  methods: {

  }
}
</script>
