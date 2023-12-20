<script setup lang="ts">
import {
  AisInstantSearch,
  AisSearchBox,
  AisHits,
  AisRefinementList,
  AisConfigure,
} from "vue-instantsearch/vue3/es";

import { history } from "instantsearch.js/es/lib/routers";
import { simple } from "instantsearch.js/es/lib/stateMappings";

const routing = {
  router: history(),
  stateMapping: simple(),
};

// import { translateLabel } from "../lib/helpers";

const indexName = "codingcatdev-cats";
const algolia = useAlgoliaRef();

const links = [
  {
    label: "Cat overview",
    icon: "i-heroicons-list-bullet",
    to: "/cats",
  },
];

const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "color",
    label: "Color",
  },
  {
    key: "vacinated",
    label: "vacinated",
  },
];

const selectedColumns = ref([...columns]);

function transformItems(items: any) {
  return items.map((item: any) => ({
    ...item,
    label: item.label,
  }));
}

function mapToTableRows(items: any) {
  return items.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      color: item.color,
      vacinated: item.vacinated,
      class: "bg-gray-50 dark:bg-gray-950",
    };
  });
}
</script>

<template>
  <ais-instant-search
    :index-name="indexName"
    :search-client="algolia"
    :routing="routing"
  >
    <ais-configure :hitsPerPage="100" />
    <UPage :ui="{ wrapper: 'max-w-full', left: 'pl-8' }">
      <template #left>
        <UAside>
          <h3 class="font-bold mb-2">Color</h3>
          <ais-refinement-list
            attribute="color"
            operator="and"
            :transform-items="transformItems"
          >
            <template v-slot:item="{ item, refine }">
              <UCheckbox
                color="primary"
                :checked="item.isRefined"
                :model-value="item.value"
                @change="refine(item.value)"
                :ui="{ wrapper: 'mb-1' }"
              >
                <template #label>
                  <span class="space-x-2">
                    <span>{{ item.label }}</span>
                    <UBadge
                      variant="subtle"
                      size="xs"
                      :ui="{ rounded: 'rounded-full' }"
                    >
                      {{ item.count }}
                    </UBadge>
                  </span>
                </template>
              </UCheckbox>
            </template>
          </ais-refinement-list>

          <UDivider type="solid" class="my-6" />

          <h3 class="font-bold mb-2">Vacinated</h3>
          <ais-refinement-list attribute="vacinated">
            <template v-slot:item="{ item, refine }">
              <UCheckbox
                color="primary"
                :checked="item.isRefined"
                :model-value="item.value"
                @change="refine(item.value)"
                :ui="{ wrapper: 'mb-1' }"
              >
                <template #label>
                  <span class="space-x-2">
                    <span>{{ item.label }}</span>
                    <UBadge
                      variant="subtle"
                      size="xs"
                      :ui="{ rounded: 'rounded-full' }"
                    >
                      {{ item.count }}
                    </UBadge>
                  </span>
                </template>
              </UCheckbox>
            </template>
          </ais-refinement-list>

          <template #top>
            <UPageLinks :links="links" />
          </template>
        </UAside>
      </template>
      <UPageBody>
        <ais-hits>
          <template v-slot="{ items }">
            <div class="flex justify-between pr-4 mb-8">
              <div class="flex gap-4">
                <ais-search-box>
                  <template
                    v-slot="{ currentRefinement, isSearchStalled, refine }"
                  >
                    <UInput
                      type="search"
                      placeholder="Search Cat"
                      icon="i-heroicons-magnifying-glass-20-solid"
                      :loading="isSearchStalled"
                      :modelValue="currentRefinement"
                      color="primary"
                      variant="outline"
                      @input="refine($event.currentTarget.value)"
                    />
                  </template>
                </ais-search-box>
              </div>
              <USelectMenu
                v-model="selectedColumns"
                :options="columns"
                multiple
                placeholder="Columns"
              />
            </div>

            <UTable
              :columns="selectedColumns"
              :rows="mapToTableRows(items)"
            />
          </template>
        </ais-hits>
      </UPageBody>
    </UPage>
  </ais-instant-search>
</template>