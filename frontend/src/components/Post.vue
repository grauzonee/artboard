<script setup lang="ts">
import avatar from "@/assets/images/avatar-placeholder.png";
import bg from "@/assets/images/login-bg.png";
</script>
<template>
  <div
    class="rounded-lg shadow-sm px-9 py-4 bg-light text-gray-800 glex flex-col items-center"
  >
    <div class="flex flex-row w-100 items-end gap-2 mb-4">
      <span
        class="rounded-full boder border-gray-800 h-16 w-16 overflow-hidden"
      >
        <img :src="avatar" />
      </span>
      <span class="text-base block font-bold mb-3">User name</span>
    </div>
    <span class="mb-2 block">
      <img :src="bg" />
    </span>
    <span class="mb-3 text-sm"> Post description </span>
    <div class="flex justify-end">
      <font-awesome-icon
        class="text-gray-500 hover:text-red-500 cursor-pointer text-xl"
        icon="heart"
      />
    </div>
  </div>
</template>
