<script setup lang="ts">
import SinglePost from "@/components/SinglePost.vue";
import MyPosts from "@/components/tabs/MyPosts.vue";
import NewPostWidget from "@/components/widgets/NewPostWidget.vue";
import { inject, onMounted, ref } from "vue";

const setMainStyle = inject("setMainStyle");
const newPostWidget = ref(null);
onMounted(() => {
  setMainStyle?.({
    overflow: "hidden",
  });
});

function onAddPostClick() {
  newPostWidget.value.widgetRef.toggleWidget();
}
</script>
<template>
  <NewPostWidget ref="newPostWidget" />
  <div class="posts-page h-full">
    <div
      class="flex flex-col lg:flex-row lg:flex-row gap-5 h-[calc(100%-1rem)]"
    >
      <div class="w-full lg:w-1/5 p-4 bg-gray-100 text-black">
        Filters
      </div>
      <div
        class="flex-1 h-full overflow-auto flex flex-col gap-5 no-scrollbar order-2 lg:order-none"
      >
        <SinglePost />
        <SinglePost />
      </div>
      <MqResponsive
        target="lg+"
        class="w-1/2 lg:w-1/4 order-1 lg:order-none"
      >
        <MyPosts
          class="w-full"
          @add-post-click="onAddPostClick"
        />
      </MqResponsive>
    </div>
  </div>
</template>
<style scoped></style>
