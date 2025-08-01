<script setup lang="ts">
import SinglePost from "@/components/SinglePost.vue";
import MyPosts from "@/components/tabs/MyPosts.vue";
import NewPostWidget from "@/components/widgets/NewPostWidget.vue";
import PostFilter from "@/components/tabs/PostFilter.vue";
import { inject, onMounted, ref } from "vue";

const setMainStyle = inject("setMainStyle");
const newPostWidget = ref(null);
const filtersRef = ref(null);
onMounted(() => {
  setMainStyle?.({
    overflow: "hidden",
  });
});

function onAddPostClick() {
  newPostWidget.value.widgetRef.toggleWidget();
}

function handlePostsScroll() {
  if (filtersRef.value.showFilters === true) {
    filtersRef.value.toggleShowFilters();
  }
}
</script>
<template>
  <NewPostWidget ref="newPostWidget" />
  <div class="posts-page h-full">
    <div
      class="flex flex-col lg:flex-row lg:flex-row gap-5 h-[calc(100%-1rem)]"
    >
      <PostFilter
        ref="filtersRef"
        class="w-full lg:w-1/5 p-4 bg-gray-100 text-lx"
      />
      <div
        class="flex-1 h-full overflow-scroll flex flex-col gap-5 no-scrollbar order-2 lg:order-none"
        @scroll="handlePostsScroll"
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
