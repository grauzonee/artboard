<script setup lang="ts">
import MyPosts from "@/components/tabs/MyPosts.vue";
import NewPostWidget from "@/components/widgets/NewPostWidget.vue";
import PostWidget from "@/components/widgets/PostWidget.vue";
import PostFilter from "@/components/tabs/PostFilter.vue";
import { PostFilter as PostFilterData } from "@/types/PostFilter.ts";
import PostsList from "@/components/PostsList.vue";
import { inject, onMounted, ref, provide } from "vue";

const setMainStyle = inject("setMainStyle");
const newPostWidget = ref(null);
const postWidget = ref(null);
const filtersRef = ref(null);
const postsListRef = ref(null);
const myPostsRef = ref(null);
const activePost = ref(null);

const postFilter = ref(null);

onMounted(async () => {
  setMainStyle?.({
    overflow: "hidden",
  });
  postFilter.value = new PostFilterData({
    sortByDesc: "createdAt",
  });
});

function onAddPostClick() {
  newPostWidget.value?.toggleWidget();
}

async function onPostAdded() {
  newPostWidget.value?.toggleWidget();
  await postsListRef.value?.refreshFeed(1);
  await myPostsRef.value?.fetchMyPosts();
}

function onSelectPost(post) {
  activePost.value = post;
  postWidget.value?.toggleWidget();
}

async function onSearch() {
  await postsListRef.value?.refreshFeed(1);
}

function updatePostFilter(key: string, value: string) {
  postFilter.value[key] = value;
}
provide("onSelectPost", onSelectPost);
provide("updatePostFilter", updatePostFilter);
</script>
<template>
  <NewPostWidget ref="newPostWidget" @post-added="onPostAdded" />
  <PostWidget ref="postWidget" :post="activePost" />
  <div v-if="postFilter" class="posts-page h-full">
    <div
      class="flex flex-col lg:flex-row lg:flex-row gap-6 h-[calc(100%-0.8rem)]"
    >
      <PostFilter
        ref="filtersRef"
        class="w-full lg:w-1/5 p-4 bg-gray-100 text-lx"
        @search="onSearch"
      />
      <PostsList ref="postsListRef" :post-filter="postFilter" />
      <MqResponsive target="lg+" class="w-1/2 lg:w-1/4 order-1 lg:order-none">
        <MyPosts
          ref="myPostsRef"
          @add-post-click="onAddPostClick"
          @post-selected="onSelectPost"
        />
      </MqResponsive>
    </div>
  </div>
</template>
<style scoped></style>
