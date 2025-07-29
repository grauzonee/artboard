<script setup lang="ts">
import { ref, provide } from "vue";
import BaseTopbar from "@/components/BaseTopbar.vue";
import BaseFooter from "@/components/BaseFooter.vue";

const mainStyle = ref({});

function setMainStyle(newStyle) {
  mainStyle.value = newStyle;
}

provide("setMainStyle", setMainStyle);
</script>

<template>
  <div class="layout grid grid-rows-[auto_1fr_auto] w-full">
    <header class="header">
      <BaseTopbar />
    </header>
    <main
      class="main px-24 py-5"
      :style="mainStyle"
    >
      <slot />
    </main>
    <BaseFooter />
  </div>
</template>

<style scoped>
.layout {
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header"
    "main"
    "footer";
  height: 100vh;
  overflow: hidden;
}

.header {
  grid-area: header;
}

.main {
  grid-area: main;
  background-image: var(--child-bg-image, none);
}

.footer {
  grid-area: footer;
}
</style>
