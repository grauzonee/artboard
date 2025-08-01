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
    <div class="flex gap-5 h-[calc(100%-1rem)]">
      <MqResponsive target="mdPlus">
        <div class="w-1/6 h-full p-4 bg-gray-100 text-black">
          Filters
        </div>
      </MqResponsive>
      <div class="w-2/3 h-full overflow-auto flex flex-col gap-5 no-scrollbar">
        <SinglePost />
        <SinglePost />
      </div>
      <MyPosts
        class="w-1/4"
        @add-post-click="onAddPostClick"
      />
    </div>
  </div>
</template>
<style scoped></style>
