<template>
  <nav>
    <ul class="pagination">
      <li
        :class="{disabled: page.current_page <= 1 }"
        class="page-item"
      >
        <a
          class="page-link"
          href="javascript:;"
          @click.prevent="changePage(page.current_page -1)"
        >
          Previous
        </a>
      </li>
      <li
        v-for="n in page.total_pages"
        :key="n"
        :class="{active : page.current_page === n}"
        class="page-item"
      >
        <a
          class="page-link"
          href="javascript:;"
          @click.prevent="changePage(n)"
        >
          {{ n }}
        </a>
      </li>
      <li
        :class=" {disabled: page.current_page >= page.total_pages}"
        class="page-item"
      >
        <a
          class="page-link"
          href="javascript:;"
          @click="changePage(page.current_page + 1)"
        >
          Next
        </a>
      </li>
    </ul>
    <!-- <nav class="d-flex justify-content-center">
            <ul class="pagination">
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item active">
                <a
                  class="page-link"
                  href="#"
                >1</a>
              </li>
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                >2</a>
              </li>
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                >3</a>
              </li>
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav> -->
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    page: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    changePage (page) {
      this.$emit('e-change-page', page)
    }
  }
}
</script>
