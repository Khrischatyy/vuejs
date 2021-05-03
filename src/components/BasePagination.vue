<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a @click.prevent="decrement"
         href="#" class="pagination__link pagination__link--arrow pagination__link--arrow"
         aria-label="Предыдущая страница">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li v-for="(pageNumber,index) in pages" :key="index"   class="pagination__item">
      <a href="#" @click.prevent="paginate(pageNumber)"
         class="pagination__link" :class="{'pagination__link--current':pageNumber === page}">
        {{pageNumber}}
      </a>
    </li>
    <li @click.prevent="increment"  class="pagination__item">
      <a class="pagination__link pagination__link--arrow"
         href="#" aria-label="Следующая страница">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },
  name: 'BasePagination',
  props: ['page', 'count', 'perPage'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    paginate(pageNumber) {
      this.$emit('paginate', pageNumber);
    },
    increment() {
      if (this.page < this.pages) {
        this.$emit('paginate', this.page + 1);
      }
    },
    decrement() {
      if (this.page > 1) {
        this.$emit('paginate', this.page - 1);
      }
    },
  },
};
</script>

<style scoped>

</style>
