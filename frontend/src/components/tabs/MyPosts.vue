<script setup lang="ts">
import ContentPanel from "@/components/ContentPanel.vue";
import example from "@/assets/images/main1.png";
import example2 from "@/assets/images/logo.png";

defineEmits(["addPostClick"]);
</script>
<template>
  <ContentPanel class="p-5 overflow-scroll no-scrollbar">
    <div class="w-100 flex flex-row justify-between mb-3">
      <p class="h3 uppercase text-lightGray">
        My gallery
      </p>
      <font-awesome-icon
        icon="plus"
        class="cursor-pointer h-2 text-bold pointer text-gray-500 bg-primary-orange text-white rounded-full p-1"
        @click="$emit('addPostClick')"
      />
    </div>
    <div className="grid grid-cols-2 gap-1">
      <div class="w-100 grid gap-1">
        <div>
          <img
            class="object-cover object-center h-auto max-w-full rounded-sm"
            :src="example"
          >
        </div>
      </div>
      <div class="w-100 grid gap-1">
        <div>
          <img
            class="object-cover object-center h-auto max-w-full rounded-sm"
            :src="example2"
          >
        </div>
      </div>
    </div>
  </ContentPanel>
</template>
