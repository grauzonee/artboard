<script setup lang="ts">
import SinglePost from "@/components/SinglePost.vue";
import NewPostWidget from "@/components/widgets/NewPostWidget.vue";
import PostWidget from "@/components/widgets/PostWidget.vue";
import ScrollableList from "@/components/ScrollableList.vue";
import UserProfile from "@/components/tabs/UserProfile.vue";
import { inject, onMounted, ref } from "vue";
import { getPosts } from "@/helpers/posts.ts";
import { getCurrentUserId } from "@/helpers/user.ts";
import { useRoute } from "vue-router";

const setMainStyle = inject("setMainStyle");
const newPostWidget = ref(null);
const postWidget = ref(null);
const postListRef = ref(null);
const posts = ref([]);
const activePost = ref(null);
const page = ref(1);
const canEdit = ref(false);

onMounted(async () => {
  await setPosts();

  setMainStyle?.({
    overflow: "hidden",
  });
});

async function setPosts() {
  const route = useRoute();
  const userId = route.params.id;
  canEdit.value = getCurrentUserId() === userId;
  if (userId === "mine") {
    canEdit.value = true;
    await fetchPosts(null);
    return;
  }
  await fetchPosts(userId);
}

async function fetchPosts(userId: string | null) {
  try {
    const newPostsData = await getPosts(page.value, userId, "createdAt");
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
  activePost.value = post;
  postWidget.value?.toggleWidget();
}

async function onPostDeleted() {
  console.log("onPostDeleted");
  await fetchPosts();
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
    <div class="flex flex-row gap-6 h-[calc(100%-0.8rem)]">
      <ScrollableList
        v-if="posts.length > 0"
        ref="postListRef"
        @load-more="onLoadMore"
      >
        <SinglePost
          v-for="(post, index) in posts"
          :key="index"
          :post="post"
          :can-edit="canEdit"
          @click="selectPost(post)"
          @post-deleted="onPostDeleted"
        />
      </ScrollableList>
      <div
        v-else
        class="flex-1"
      >
        <p>Loading...</p>
      </div>
      <MqResponsive
        target="md+"
        class="w-1/3"
      >
        <UserProfile />
      </MqResponsive>
    </div>
  </div>
</template>
<style scoped></style>
