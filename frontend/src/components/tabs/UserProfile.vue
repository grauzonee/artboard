<script setup lang="ts">
import { ref, onMounted } from "vue";
import ContentPanel from "@/components/ContentPanel.vue";
import AvatarHolder from "@/components/AvatarHolder.vue";
import SingleMaterial from "@/components/SingleMaterial.vue";

import { getUser, getCurrentUserId } from "@/helpers/user.ts";

const props = defineProps({
  showUser: {
    type: Object,
    default: null,
  },
  userId: {
    type: String,
    default: null,
  },
});
const user = ref(null);
const canEdit = ref(false);

onMounted(async () => {
  if (props.showUser) {
    user.value = props.showUser;
  } else {
    user.value = await getUser(props.userId);
  }
  console.log("User id", getCurrentUserId(), user.value.id);
  canEdit.value = getCurrentUserId() === user.value?.id;
});
</script>

<template>
  <ContentPanel class="w-full h-full overflow-scroll no-scrollbar">
    <div
      v-if="user"
      class="flex flex-col p-5 overflow-scroll w-full"
    >
      <AvatarHolder
        :url="user.avatar"
        class="max-w-64"
      />
      <div class="grid grid-cols-2 gap-4 mb-3">
        <div class="flex flex-col">
          <span class="text-gray-500 font-bold text-xs uppercase">Username</span>
          <span class="text-xs font-bold">{{ user.username }}</span>
        </div>

        <div class="flex items-end justify-end">
          <span
            v-show="canEdit"
            class="cursor-pointer text-gray-700 uppercase p-2 border border-gray-500 rounded-md text-sm"
          >
            Edit profile
          </span>
        </div>
      </div>

      <span class="font-bolt text-xs text-gray-700">{{
        user.description
      }}</span>
      <hr class="text-gray-500 my-2">
      <div class="grid grid-cols-2 mb-2">
        <div class="user-info-field">
          <span class="text-gray-700 font-bold">10</span>
          <span class="font-bold">Posts</span>
        </div>
        <div class="user-info-field">
          <span class="text-gray-700 font-bold">10</span>
          <span class="font-bold">Posts</span>
        </div>
        <div class="user-info-field">
          <span class="text-gray-700 font-bold">10</span>
          <span class="font-bold">Posts</span>
        </div>
        <div class="user-info-field">
          <span class="text-gray-700 font-bold">10</span>
          <span class="font-bold">Posts</span>
        </div>
      </div>
      <div class="flex flex-col mb-3">
        <span class="text-gray-500 font-bold text-xs uppercase block mb-1">Materials</span>
        <div class="flex flex-row flex-wrap gap-2">
          <SingleMaterial
            v-for="(material, index) in user.materials"
            :key="index"
            class="px-2 py-1"
            :label="material"
          />
        </div>
      </div>
    </div>
    <div v-else>
      Loading...
    </div>
  </ContentPanel>
</template>
<style scoped>
.user-info-field {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
  align-items: center;
  border: solid 0.5px #e3e3e3;
  padding: 5px;
}
</style>
