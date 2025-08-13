<script setup lang="ts">
import ContentPanel from "@/components/ContentPanel.vue";
import { ref, onMounted } from "vue";
import { getPosts } from "@/helpers/posts.ts";
import { getUser } from "@/helpers/user.ts";
import { PostFilter } from "@/types/PostFilter.ts";

const posts = ref([]);
const user = ref(null);
let postFilter = null;

defineEmits(["postSelected", "addPostClick"]);

onMounted(async () => {
  user.value = await getUser();
  postFilter = new PostFilter({
    author: user.value.id,
    sortByDesc: "createdAt",
  });
  await fetchMyPosts();
});

async function fetchMyPosts() {
  try {
    const myPostsData = await getPosts(1, postFilter);
    if (myPostsData.docs && myPostsData.docs.length > 0) {
      posts.value = myPostsData.docs;
    }
  } catch (error) {
    console.log("ERROR", error);
  }
}

defineExpose({ fetchMyPosts });
</script>
<template>
  <ContentPanel class="p-5 overflow-scroll no-scrollbar max-h-full">
    <div class="w-100 flex flex-row justify-between mb-3">
      <p class="h3 uppercase text-lightGray">
        My gallery
      </p>
      <font-awesome-icon
        icon="plus"
        class="cursor-pointer h-2 text-bold pointer text-gray-500 bg-primary-orange text-white rounded-full p-1"
        @click="$emit('addPostClick', post)"
      />
    </div>
    <div className="grid grid-cols-2 gap-1">
      <div
        v-for="(post, index) in posts"
        :key="index"
        class="w-100 grid gap-1 cursor-pointer"
        @click="$emit('postSelected', post)"
      >
        <div>
          <img
            class="object-cover object-center h-auto max-w-full rounded-sm"
            :src="post.imageUrl"
          >
        </div>
      </div>
    </div>
    <router-link
      :to="{ name: 'posts', params: { id: 'mine' } }"
      class="w-full block"
    >
      <span class="text-xs font-bold text-center block mt-3 cursor-pointer">See all</span>
    </router-link>
  </ContentPanel>
</template>
