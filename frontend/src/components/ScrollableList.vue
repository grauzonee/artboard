<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["loadMore"]);
const scrolledToEnd = ref(false);
const hasNext = ref(true);

function handleScroll(event) {
  const { scrollTop, clientHeight, scrollHeight } = event.target;

  if (scrollTop + clientHeight === scrollHeight) {
    scrolledToEnd.value = true;
  }
}

function onLoadMoreClick() {
  emit("loadMore");
  scrolledToEnd.value = false;
}

function setHasNext(newValue: bool) {
  hasNext.value = newValue;
}

defineExpose({ setHasNext });
</script>
<template>
  <div
    class="flex-1 h-full overflow-scroll flex flex-col gap-5 no-scrollbar order-2 lg:order-none"
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
