<template>
  <div class="search-bar">
    <a-input-search v-model:value="searchQuery" @focus="expand" @blur="collapse" placeholder="Search..." />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const searchQuery = ref('');
    const isExpanded = ref(false);

    function expand() {
      isExpanded.value = true;
    }

    function collapse() {
      isExpanded.value = false;
    }

    return { searchQuery, isExpanded, expand, collapse };
  },
});
</script>

<style scoped>
.search-bar {
  display: flex;
}

.search-bar a-input-search {
  transition: width 0.3s;
  width: 200px;
}

.search-bar a-input-search:focus {
  width: 300px;
}
</style>
