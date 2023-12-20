<script setup lang="ts">
import {
  AisInstantSearch,
  AisSearchBox,
  AisHits,
} from "vue-instantsearch/vue3/es";

const indexName = "algolia_index";
const algolia = useAlgoliaRef();
</script>

<template>
  <ais-instant-search :index-name="indexName" :search-client="algolia">
    <ais-search-box />
    <ais-hits />
  </ais-instant-search>
</template>
