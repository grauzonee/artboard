<script setup lang="ts">
import ContentPanel from "@/components/ContentPanel.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserInfoField from "@/components/UserInfoField.vue";
import UserAvatarField from "@/components/UserAvatarField.vue";
import AvatarWidget from "@/components/widgets/AvatarWidget.vue";
import PasswordWidget from "@/components/widgets/PasswordWidget.vue";
import { getUser } from "@/helpers/user.ts";
import { onMounted, ref } from "vue";
import User from "@/types/User.ts";

const user = ref<User | null>(null);
let infoFields = {};
const infoFieldsRef = ref([]);
const avatarWidgetRef = ref(null);
const passwordWidgetRef = ref(null);

onMounted(async () => {
  user.value = await getUser();
  infoFields = {
    username: {
      label: "Username",
      value: user.value.username,
    },
    email: {
      label: "Email",
      value: user.value.email,
    },
    name: {
      label: "Name",
      value: "John",
    },
    surname: {
      label: "Surname",
      value: "Doe",
    },
    birthdate: {
      label: "Birthdate",
      value: "12.09.2004",
      inputType: "date",
    },
  };
});

function onAvatarClick() {
  avatarWidgetRef.value?.widgetRef.toggleWidget();
}
function onChangePasswordClick() {
  passwordWidgetRef.value?.widgetRef.toggleWidget();
}
function onToggleEdit() {
  console.log("onToggleShow");
}
</script>
<template>
  <AvatarWidget ref="avatarWidgetRef" />
  <PasswordWidget ref="passwordWidgetRef" />
  <div
    v-if="user"
    class="profile-page flex flex-row w-full"
  >
    <ContentPanel class="w-1/2 mx-3 p-5">
      <div class="flex flex-col justify-between gap-3">
        <div class="flex flex-col justify-between items-center mb-3">
          <UserAvatarField
            class="h-20 w-20"
            @click="onAvatarClick"
          />
        </div>
        <div class="user-info flex flex-col gap-3">
          <ContentPanel class="p-3">
            <UserInfoField
              v-for="(item, index) in Object.values(infoFields)"
              :key="index"
              ref="infoFieldsRef"
              :label="item.label"
              :value="item['value']"
              class="my-3"
              :input-type="item.inputType ?? 'text'"
              @toggle-edit="onToggleEdit"
            />
          </ContentPanel>
          <BaseButton
            label="Change password"
            @clicked="onChangePasswordClick"
          />
        </div>
      </div>
    </ContentPanel>
    <ContentPanel class="w-1/2 mx-3 p-5">
      <div class="user-qualities flex flex-col gap-3">
        <span>Profile description: </span>
        <span>Materials: </span>
      </div>
    </ContentPanel>
  </div>
  <div v-else>
    Loading...
  </div>
</template>
