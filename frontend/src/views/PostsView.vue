<script setup lang="ts">
import SinglePost from "@/components/SinglePost.vue";
import MyPosts from "@/components/tabs/MyPosts.vue";
import NewPostWidget from "@/components/widgets/NewPostWidget.vue";
import PostFilter from "@/components/tabs/PostFilter.vue";
import { inject, onMounted, ref } from "vue";
import { getPosts } from "@/helpers/posts.ts";

const setMainStyle = inject("setMainStyle");
const newPostWidget = ref(null);
const filtersRef = ref(null);
const posts = ref(null);
onMounted(async () => {
  await fetchPosts();
  setMainStyle?.({
    overflow: "hidden",
  });
});

function onAddPostClick() {
  newPostWidget.value.widgetRef.toggleWidget();
}

async function fetchPosts() {
  try {
    posts.value = await getPosts(null, "createdAt");
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <NewPostWidget ref="newPostWidget" />
  <div class="posts-page h-full">
    <div
      class="flex flex-col lg:flex-row lg:flex-row gap-6 h-[calc(100%-0.8rem)]"
    >
      <PostFilter
        ref="filtersRef"
        class="w-full lg:w-1/5 p-4 bg-gray-100 text-lx"
      />
      <div
        v-if="posts"
        class="flex-1 h-full overflow-scroll flex flex-col gap-5 no-scrollbar order-2 lg:order-none"
      >
        <SinglePost
          v-for="(post, index) in posts"
          :key="index"
          :post="post"
        />
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
      <MqResponsive
        target="lg+"
        class="w-1/2 lg:w-1/4 order-1 lg:order-none"
      >
        <MyPosts @add-post-click="onAddPostClick" />
      </MqResponsive>
    </div>
  </div>
</template>
<style scoped></style>
