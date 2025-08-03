<script setup lang="ts">
import SinglePost from "@/components/SinglePost.vue";
import MyPosts from "@/components/tabs/MyPosts.vue";
import NewPostWidget from "@/components/widgets/NewPostWidget.vue";
import PostWidget from "@/components/widgets/PostWidget.vue";
import PostFilter from "@/components/tabs/PostFilter.vue";
import ScrollableList from "@/components/ScrollableList.vue";
import { inject, onMounted, ref } from "vue";
import { getPosts } from "@/helpers/posts.ts";

const setMainStyle = inject("setMainStyle");
const newPostWidget = ref(null);
const postWidget = ref(null);
const filtersRef = ref(null);
const postListRef = ref(null);
const posts = ref([]);
const activePost = ref(null);
const page = ref(1);
onMounted(async () => {
  await fetchPosts();
  setMainStyle?.({
    overflow: "hidden",
  });
});

function onAddPostClick() {
  newPostWidget.value?.toggleWidget();
}

async function fetchPosts() {
  try {
    const newPostsData = await getPosts(page.value, null, "createdAt");
    if (newPostsData.docs && newPostsData.docs.length > 0) {
      posts.value = [...posts.value, ...newPostsData.docs];
      postListRef.value?.setHasNext(newPostsData.hasNext);
    }
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMore() {
  page.value++;
  await fetchPosts();
}

async function onPostAdded() {
  page.value = 1;
  posts.value = [];
  newPostWidget.value?.toggleWidget();
  await fetchPosts();
}

function selectPost(post) {
  console.log(post);
  activePost.value = post;
  postWidget.value?.toggleWidget();
}
</script>
<template>
  <NewPostWidget
    ref="newPostWidget"
    @post-added="onPostAdded"
  />
  <PostWidget
    ref="postWidget"
    :post="activePost"
  />
  <div class="posts-page h-full">
    <div
      class="flex flex-col lg:flex-row lg:flex-row gap-6 h-[calc(100%-0.8rem)]"
    >
      <PostFilter
        ref="filtersRef"
        class="w-full lg:w-1/5 p-4 bg-gray-100 text-lx"
      />
      <ScrollableList
        v-if="posts.length > 0"
        ref="postListRef"
        @load-more="onLoadMore"
      >
        <SinglePost
          v-for="(post, index) in posts"
          :key="index"
          :post="post"
          @click="selectPost(post)"
        />
      </ScrollableList>
      <div
        v-else
        class="flex-1"
      >
        <p>Loading...</p>
      </div>
      <MqResponsive
        target="lg+"
        class="w-1/2 lg:w-1/4 order-1 lg:order-none"
      >
        <MyPosts
          @add-post-click="onAddPostClick"
          @post-selected="selectPost"
        />
      </MqResponsive>
    </div>
  </div>
</template>
<style scoped></style>
