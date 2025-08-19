<script setup lang="ts">
import { ref, inject, onMounted } from "vue";

const scrolledToEnd = ref(false);
const hasNext = ref(true);
const page = ref(1);
const items = ref([]);
const loadMoreCallback = inject("loadMoreCallback");

onMounted(async () => {
  await loadMore();
});
function handleScroll(event) {
  const { scrollTop, clientHeight, scrollHeight } = event.target;

  if (scrollTop + clientHeight === scrollHeight) {
    scrolledToEnd.value = true;
  }
}

async function loadMore() {
  const newItemsData = await loadMoreCallback?.(page.value);
  hasNext.value = newItemsData.hasNext;
  items.value = [...items.value, ...newItemsData.docs];
  scrolledToEnd.value = false;
}
async function onLoadMoreClick() {
  page.value++;
  await loadMore();
}

async function refreshFeed(newPage: number | null) {
  items.value = [];
  if (newPage != null) page.value = newPage;
  await loadMore();
}

function getItems() {
  return items.value;
}
defineExpose({ refreshFeed, getItems });
</script>
<template>
  <div
    class="flex-1 h-full overflow-scroll flex flex-col gap-5 no-scrollbar"
    @scroll="handleScroll"
  >
    <slot />

    <font-awesome-icon
      v-if="scrolledToEnd && hasNext"
      icon="arrow-down-long"
      class="cursor-pointer h-2 text-bold pointer text-gray-500 bg-primary-orange text-white rounded-full p-1"
      @click="onLoadMoreClick"
    />
  </div>
</template>
