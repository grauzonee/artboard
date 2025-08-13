<script setup lang="ts">
import PostWidget from "@/components/widgets/PostWidget.vue";
import UserProfile from "@/components/tabs/UserProfile.vue";
import UserOverviewContent from "@/components/UserOverviewContent.vue";
import { inject, onMounted, ref, provide } from "vue";

const setMainStyle = inject("setMainStyle");
const postWidget = ref(null);
const activePost = ref(null);

onMounted(async () => {
  setMainStyle?.({
    overflow: "hidden",
  });
});

function onSelectPost(post) {
  activePost.value = post;
  postWidget.value?.toggleWidget();
}

provide("onSelectPost", onSelectPost);
</script>
<template>
  <PostWidget
    ref="postWidget"
    :post="activePost"
  />
  <div class="posts-page h-full">
    <div class="flex flex-row gap-6 h-[calc(100%-0.8rem)]">
      <UserOverviewContent />
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
