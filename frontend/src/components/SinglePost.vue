<script setup lang="ts">
import avatar from "@/assets/images/avatar-placeholder.png";
import SingleMaterial from "@/components/SingleMaterial.vue";
import ConfirmationWidget from "@/components/widgets/ConfirmationWidget.vue";
import { ref, inject, onMounted } from "vue";
import { deletePost } from "@/helpers/posts.ts";
import NewPostWidget from "@/components/widgets/NewPostWidget.vue";
import { getCurrentUserId } from "@/helpers/user.ts";

const postWidgetRef = ref(null);
const onSelectPost = inject("onSelectPost");
const confirmationRef = ref(null);
const canEdit = ref(false);

const props = defineProps({
  post: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["postDeleted", "postUpdated"]);

onMounted(() => {
  setCanEdit();
});

function setCanEdit() {
  console.log(props.post.author.id, getCurrentUserId());
  canEdit.value = props.post.author.id === getCurrentUserId();
}
function onEditPost() {
  postWidgetRef.value?.toggleWidget();
}
function openConfirmationWidget() {
  confirmationRef.value?.toggleWidget();
}

function selectPost(post) {
  onSelectPost?.(post);
}

async function onConfirmed() {
  await deletePost(props.post.id);
  emit("postDeleted");
  confirmationRef.value?.toggleWidget();
}
</script>
<template>
  <NewPostWidget
    ref="postWidgetRef"
    :post="post"
    @form-submitted="$emit('postUpdated')"
  />
  <ConfirmationWidget
    ref="confirmationRef"
    label="Are you sure you want to delete this post?"
    @confirmed="onConfirmed"
  />
  <div
    v-if="post"
    class="rounded-lg shadow-sm px-9 py-4 bg-light text-gray-800 glex flex-col items-center cursor-pointer"
    @click="selectPost(post)"
  >
    <div class="flex flex-row w-100 items-end gap-2 mb-4 justify-between">
      <div class="flex flex-row w-1/3 justify-between items-end">
        <span
          class="rounded-full boder border-gray-800 h-16 w-16 overflow-hidden"
        >
          <img :src="post.author?.avatar ?? avatar">
        </span>
        <span class="text-base block font-bold mb-3">{{
          post.author.username
        }}</span>
      </div>
      <div
        v-if="canEdit"
        class="w-1/5 mb-3 flex flex-row justify-end gap-2 items-end"
      >
        <font-awesome-icon
          class="text-gray-500 hover:text-red-500 cursor-pointer text-xs"
          icon="trash"
          @click.stop="openConfirmationWidget"
        />
        <font-awesome-icon
          class="text-gray-500 hover:text-emerald-500 cursor-pointer text-xs"
          icon="pencil"
          @click.stop="onEditPost"
        />
      </div>
    </div>
    <p class="text-2xl text-primary-violet mb-3 font-bold">
      {{ post.title }}
    </p>
    <div
      class="max-h-64 w-full overflow-hidden flex items-center justify-center"
    >
      <img
        :src="post.imageUrl"
        class="w-full h-full object-cover object-center"
      >
    </div>
    <span class="mb-4 block text-sm">{{ post.content }}</span>
    <div class="flex flex-row justify-between">
      <div class="flex flex-row gap-2 items-center">
        <span class="text-xs text-gray-500 block">
          {{ post.createdAt }}
        </span>

        <SingleMaterial
          v-for="(material, index) in post.materials"
          :key="index"
          class="px-1 text-sm"
          :label="material"
        />
      </div>
      <font-awesome-icon
        class="text-gray-500 hover:text-red-500 cursor-pointer text-xl"
        icon="heart"
      />
    </div>
  </div>
</template>
